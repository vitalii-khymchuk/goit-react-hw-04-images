import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWrap } from './Modal.styled';

export default function Modal({
  modalImg: { largeImageURL, tags },
  closeModal,
}) {
  useEffect(() => {
    const onKeyPress = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [closeModal]);

  const onClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={onClick}>
      <ModalWrap className="Modal">
        <img src={largeImageURL} alt={tags} />
      </ModalWrap>
    </Overlay>
  );
}

Modal.propTypes = {
  modalImg: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
