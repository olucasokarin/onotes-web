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
  ListCategories,
  ListNotes,
  NoteContent,
  NoteItem,
  CategoryItem,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import ModalAdd from '../../components/ModalAdd';
import ModalDelete from '../../components/ModalDeleteConfirmation';

interface Categories {
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

  const { signOut } = useAuth();

  const [titleNote, setTitleNote] = useState('');
  const [contentNote, setContentNote] = useState('');
  const [noteSelected, setNoteSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');

  const [categories, setCategories] = useState<Categories[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note>();
  const [verify, setVerify] = useState(false);

  const [addModalNote, setAddModalNote] = useState(false);
  const [addModalCategory, setAddModalCategory] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

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
  }, [categorySelected]);

  useEffect(() => {
    if (notes.length === 0) setVerify(false);
    else setVerify(true);
  }, [notes]);

  const handleCategoryChange = useCallback((id: string) => {
    setCategorySelected(id);
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
      const notess = notes.filter(noteItem => noteItem.id !== noteSelected);

      if (itemNote) {
        itemNote.name = data.name;
        itemNote.content = data.content;
        itemNote.updatedAt = new Date();

        notess.unshift(itemNote);
        setNotes(notess);
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

    setNotes(state => state.filter(item => item.id !== noteSelected));

    const upNote = notes[0];

    setNote(upNote);
    setTitleNote(upNote.name);
    setContentNote(upNote.content);
    setNoteSelected(upNote.id);
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
    setAddModalNote(!addModalNote);
  }

  function toggleModalCategory(): void {
    setAddModalCategory(!addModalCategory);
  }

  function toggleModalDelete(): void {
    setModalDelete(!modalDelete);
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
        <ListCategories>
          <button type="button" onClick={toggleModalCategory}>
            create category
          </button>

          {categories &&
            categories.map(itemCategory => (
              <CategoryItem
                key={itemCategory.id}
                selected={itemCategory.id === categorySelected}
                onClick={() => handleCategoryChange(itemCategory.id)}
              >
                {itemCategory.name}

                <FiMoreVertical size={22} />
              </CategoryItem>
            ))}
        </ListCategories>

        <ListNotes>
          <button type="button" onClick={toggleModalNote}>
            create note
          </button>
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
                  {/* <FiTrash size={24} onClick={handleDeleteNote} /> */}
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
