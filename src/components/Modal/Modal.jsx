import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWrap } from './Modal.styled';

export default function Modal({
  modalImg: { largeImageURL, tags },
  closeModal,
}) {
  useEffect(() => {
    const onKeyPress = e => {
      if (e.key && e.key === 'Escape') {
        closeModal();
      }
    };
    const onClick = e => {
      const modalRef = document.querySelector('.Modal');
      if (e.target.closest('.Modal') !== modalRef) {
        closeModal();
      }
    };
    //Без цих таймаутів не працює, де я щось пропустив?
    window.addEventListener('keydown', onKeyPress);
    setTimeout(() => {
      window.addEventListener('click', onClick);
    }, 0);
    return () => {
      setTimeout(() => {
        window.removeEventListener('keydown', onKeyPress);
        window.removeEventListener('click', onClick);
      }, 0);
    };
  }, [closeModal]);

  return (
    <Overlay>
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
