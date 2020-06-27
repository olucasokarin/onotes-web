import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import Modal from '../Modal';

import { Form } from './styles';

import Input from '../Input';
import Button from '../Button';

interface IFormData {
  name: string;
}

interface IModalProps {
  isOpen: boolean;
  setClose: () => void;
  handleAdd: (data: IFormData) => void;

  title: string;
}

const ModalAdd: React.FC<IModalProps> = ({
  isOpen,
  setClose,
  handleAdd,
  title,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      handleAdd(data);
      setClose();
    },
    [handleAdd, setClose],
  );

  return (
    <Modal isOpen={isOpen} setClose={setClose}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h2>{title}</h2>

        <Input name="name" placeholder="Type it" />

        <Button type="submit">Save</Button>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
