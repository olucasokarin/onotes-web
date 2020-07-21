import React, { useCallback } from 'react';
import Modal from '../Modal';

import { Container, Footer } from './styles';

interface IModalProps {
  isOpen: boolean;
  setClose: () => void;
  handleDelete: () => void;
}

const ModalDeleteConfirmation: React.FC<IModalProps> = ({
  isOpen,
  setClose,
  handleDelete,
}) => {
  const handleConfirmation = useCallback(async () => {
    handleDelete();
    setClose();
  }, [handleDelete, setClose]);

  return (
    <Modal isOpen={isOpen} setClose={setClose}>
      <Container>
        <h2>Confirmation</h2>

        <p>
          Are you sure you want to delete? This action cannot be undone and you
          will be unable to recover any data.
        </p>
      </Container>

      <Footer>
        <button type="button" onClick={handleConfirmation}>
          Yes, Delete it!
        </button>
        <button type="button" onClick={setClose}>
          cancel
        </button>
      </Footer>
    </Modal>
  );
};

export default ModalDeleteConfirmation;
