import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';

import { FiLogOut, FiTrash, FiMoreVertical } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ImgNothing from '../../assets/nothing to see here.svg';

import {
  Container,
  Header,
  ContainerNotes,
  ListCategoriesContainer,
  ListNotesContainer,
  ListNotes,
  NoteContent,
  NoteItem,
  CategoryItem,
  ListCategories,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import ModalAdd from '../../components/ModalAdd';
import ModalDelete from '../../components/ModalDeleteConfirmation';
import ModalEditCategory from '../../components/ModalEditCategory';
import { useToast } from '../../hooks/toast';

interface Category {
  id: string;
  name: string;
  updatedAt: Date;
}

interface Note {
  id: string;
  name: string;
  content: string;
  updatedAt: Date;
}

interface NoteFormData {
  name: string;
  content: string;
}

interface IRequestModal {
  name: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signOut } = useAuth();

  const [titleNote, setTitleNote] = useState('');
  const [contentNote, setContentNote] = useState('');
  const [noteSelected, setNoteSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({} as Category);
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>();
  const [verify, setVerify] = useState(false);

  const [addModalNote, setAddModalNote] = useState(false);
  const [addModalCategory, setAddModalCategory] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEditCategory, setModalEditCategory] = useState(false);

  useEffect(() => {
    api.get('categories').then(response => {
      if (response.data) {
        setCategories(response.data);
        setCategorySelected(response.data[0]?.id);
      }
    });
  }, []);

  useEffect(() => {
    if (categorySelected !== '')
      api
        .get('notes', {
          params: {
            categoryId: categorySelected,
          },
        })
        .then(response => {
          setNotes(response.data);
          setNote(response.data[0]);
          if (response.data[0]) {
            setTitleNote(response.data[0].name);
            setContentNote(response.data[0].content);
            setNoteSelected(response.data[0].id);
          }
        });
    else setNotes([]);
  }, [categorySelected]);

  useEffect(() => {
    if (notes.length === 0) setVerify(false);
    else setVerify(true);
  }, [notes]);

  const handleCategoryChange = useCallback((categoryItem: Category) => {
    setCategorySelected(categoryItem.id);
    setCategory(categoryItem);
  }, []);

  const handleNoteChange = useCallback((noteItem: Note) => {
    setNote(noteItem);
    setTitleNote(noteItem.name);
    setContentNote(noteItem.content);
    setNoteSelected(noteItem.id);
  }, []);

  const updateListNotes = useCallback(
    (data: NoteFormData): void => {
      const itemNote = notes.find(noteItem => noteItem.id === noteSelected);
      const listNote = notes.filter(noteItem => noteItem.id !== noteSelected);

      if (itemNote) {
        itemNote.name = data.name;
        itemNote.content = data.content;
        itemNote.updatedAt = new Date();

        listNote.unshift(itemNote);
        setNotes(listNote);
      }
    },
    [noteSelected, notes],
  );

  const handleSubmit = useCallback(
    async (data: NoteFormData) => {
      await api.put(`notes/${noteSelected}`, data);
      setTitleNote(data.name);
      setContentNote(data.content);
      updateListNotes(data);
    },
    [noteSelected, updateListNotes],
  );

  const handleDeleteNote = useCallback(async () => {
    await api.delete(`notes/${noteSelected}`);

    const newNotes = notes.filter(item => item.id !== noteSelected);

    const upNote = newNotes[0];

    setNotes(newNotes);
    setNote(upNote);
    setTitleNote(upNote?.name);
    setContentNote(upNote?.content);
    setNoteSelected(upNote?.id);
  }, [noteSelected, notes]);

  const selectedDateAsText = useMemo(() => {
    if (note) {
      const date = new Date(note.updatedAt);
      return format(date, 'PPPPp', {
        locale: ptBR,
      });
    }
    return '';
  }, [note]);

  function toggleModalNote(): void {
    console.log(categorySelected);

    if (categorySelected === '' || categorySelected === undefined)
      addToast({
        type: 'info',
        title: 'Create Note',
        description: 'Para poder criar uma nota, primeiro crie uma categoria',
      });
    else setAddModalNote(!addModalNote);
  }

  function toggleModalCategory(): void {
    setAddModalCategory(!addModalCategory);
  }

  function toggleModalDelete(): void {
    setModalDelete(!modalDelete);
  }

  function toggleModalEditCategory(): void {
    setModalEditCategory(!modalEditCategory);
  }

  async function handleAddNote(nameNote: IRequestModal): Promise<void> {
    const newNote = {
      name: nameNote.name,
      categoryId: categorySelected,
      content: '',
    };

    const response = await api.post('notes', newNote);

    setNotes(state => [response.data, ...state]);
    setNote(response.data);
    setTitleNote(response.data.name);
    setContentNote(response.data.content);
    setNoteSelected(response.data.id);
  }

  async function handleAddCategory(nameCategory: IRequestModal): Promise<void> {
    const response = await api.post('categories', nameCategory);

    setCategories(state => [response.data, ...state]);
    setCategorySelected(response.data.id);
  }

  async function handleEditCategory(
    nameCategory: IRequestModal,
  ): Promise<void> {
    try {
      const response = await api.put(`categories/${category.id}`, nameCategory);

      const listCategory = categories.filter(
        categoryItem => categoryItem.id !== category.id,
      );

      category.name = nameCategory.name;
      listCategory.unshift(category);
      setCategories(listCategory);
      setCategorySelected(response.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteCategory = useCallback(async () => {
    await api.delete(`categories/${categorySelected}`);
    const listCategory = categories.filter(
      item => item.id !== categorySelected,
    );
    setCategories(listCategory);

    if (listCategory.length > 0) setCategorySelected(listCategory[0].id);
    else setCategorySelected('');
  }, [categorySelected, categories]);

  return (
    <Container>
      {/* add a new category */}
      <ModalAdd
        title="Add your category title"
        isOpen={addModalCategory}
        setClose={toggleModalCategory}
        handleAdd={handleAddCategory}
      />

      {/* add a new note */}
      <ModalAdd
        title="Add your note title"
        isOpen={addModalNote}
        setClose={toggleModalNote}
        handleAdd={handleAddNote}
      />

      {/* delete confirmation */}
      <ModalDelete
        isOpen={modalDelete}
        setClose={toggleModalDelete}
        handleDelete={handleDeleteNote}
      />

      {/* edit category */}
      <ModalEditCategory
        isOpen={modalEditCategory}
        setClose={toggleModalEditCategory}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
        editingCategory={category}
      />

      <Header>
        <div>
          <h1>oNotes</h1>

          <div>
            <button type="button" onClick={signOut}>
              <span>Logout</span>
              <FiLogOut />
            </button>
          </div>
        </div>
      </Header>
      <ContainerNotes>
        <ListCategoriesContainer>
          <button type="button" onClick={toggleModalCategory}>
            create category
          </button>

          <ListCategories>
            {categories &&
              categories.map(itemCategory => (
                <CategoryItem
                  key={itemCategory.id}
                  selected={itemCategory.id === categorySelected}
                  onClick={() => handleCategoryChange(itemCategory)}
                >
                  {itemCategory.name}

                  <button type="button" onClick={toggleModalEditCategory}>
                    <FiMoreVertical size={22} />
                  </button>
                </CategoryItem>
              ))}
          </ListCategories>
        </ListCategoriesContainer>

        <ListNotesContainer>
          {categorySelected && (
            <button type="button" onClick={toggleModalNote}>
              create note
            </button>
          )}

          <ListNotes>
            {notes.map(itemNote => (
              <NoteItem
                selected={itemNote.id === noteSelected}
                key={itemNote.id}
                onClick={() => handleNoteChange(itemNote)}
              >
                {itemNote.name}
                <span>{itemNote.content}</span>
              </NoteItem>
            ))}
          </ListNotes>
        </ListNotesContainer>

        <NoteContent>
          {verify && note ? (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="note"
                value={titleNote}
                onChange={e => setTitleNote(e.target.value)}
              />

              <span>{selectedDateAsText}</span>

              <Textarea
                name="content"
                placeholder="content"
                value={contentNote}
                onChange={e => setContentNote(e.target.value)}
              />

              <div>
                <button type="button">
                  <FiTrash size={24} onClick={toggleModalDelete} />
                </button>

                <button type="submit">Save</button>
              </div>
            </Form>
          ) : (
            <img src={ImgNothing} alt="nothing" />
          )}
        </NoteContent>
      </ContainerNotes>
    </Container>
  );
};

export default Dashboard;
