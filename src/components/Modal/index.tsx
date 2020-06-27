import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface ImodalProps {
  children: any;
  isOpen: boolean;
  setClose: () => void;
}

const Modal: React.FC<ImodalProps> = ({ children, isOpen, setClose }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setClose}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '45%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#3E3B47',
          color: '#f3ede8',
          borderRadius: '10px',
          width: '600px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#28262Ecc',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
