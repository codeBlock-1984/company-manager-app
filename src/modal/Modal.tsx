import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

type PropType = {
  title: string;
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
};

const style = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    fontSize: '1rem',
    padding: '30px 60px',
    width: '30%',
    transform: 'translate(-50%, -50%)',
  }
};

const AppModal = ({ title, isOpen, close, children }: PropType) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        style={style}
        contentLabel={title}
      >
        <h6 className="title">{title}</h6>
        {children}
      </Modal>
    </div>
  );
};

export default AppModal;
