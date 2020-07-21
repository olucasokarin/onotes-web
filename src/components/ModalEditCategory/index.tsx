import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { FiX } from 'react-icons/fi';
import Modal from '../Modal';

import { Form, Footer, Container, ContainerDelete } from './styles';

import Input from '../Input';

interface IFormData {
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface IModalProps {
  isOpen: boolean;
  setClose: () => void;
  handleEditCategory: (data: IFormData) => void;
  handleDeleteCategory: () => void;
  editingCategory: Category;
}

const ModalEditCategory: React.FC<IModalProps> = ({
  isOpen,
  setClose,
  handleEditCategory,
  handleDeleteCategory,
  editingCategory,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [visible, setVisible] = useState(false);

  const handleVisibleDelete = useCallback(() => {
    setVisible(state => !state);
  }, []);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      handleEditCategory(data);
      setClose();
      setVisible(false);
    },
    [handleEditCategory, setClose],
  );

  function handleDelete(): void {
    handleDeleteCategory();
    setClose();
    setVisible(false);
  }

  function closeDeleteContainer(): void {
    setVisible(false);
    setClose();
  }

  return (
    <Modal isOpen={isOpen} setClose={closeDeleteContainer}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingCategory}>
        <div>
          <h2>Edit Category</h2>

          <button type="button" onClick={closeDeleteContainer}>
            <FiX size={30} />
          </button>
        </div>

        <Input name="name" placeholder="Type it" />

        <Footer>
          <button type="submit">Save</button>
          <button type="button" onClick={handleVisibleDelete}>
            Delete
          </button>
        </Footer>
      </Form>

      <ContainerDelete visible={visible}>
        <Container>
          <h2>Confirmation</h2>

          <p>
            Are you sure you want to delete? This action cannot be undone and
            you will be unable to recover any data.
          </p>
        </Container>

        <Footer>
          <button type="button" onClick={handleDelete}>
            Yes, Delete it!
          </button>
          <button type="button" onClick={handleVisibleDelete}>
            cancel
          </button>
        </Footer>
      </ContainerDelete>
    </Modal>
  );
};

export default ModalEditCategory;
