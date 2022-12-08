import { useReducer, useEffect, useLayoutEffect } from 'react';
import { pixabay } from 'API';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Searchbar from './Searchbar';
import { stateReducer } from 'utils/appStateReducer';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [state, setState] = useReducer(stateReducer, {
    searchQuery: '',
    images: [],
    modalImg: {},
    currentPage: 1,
    totalPages: null,
    status: Status.IDLE,
  });

  const { images, modalImg, status, totalPages, currentPage, searchQuery } =
    state;

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setState({ type: 'setStatus', payload: Status.PENDING });
    pixabay
      .get({ query: searchQuery, currentPage })
      .then(({ totalPages, normalizedHits }) => {
        setState({ type: 'addImages', payload: normalizedHits });
        setState({ type: 'setStatus', payload: Status.RESOLVED });
        setState({ type: 'saveTotalPages', payload: totalPages });
      })
      .catch(msg => {
        console.log(msg);
        setState({ type: 'setStatus', payload: Status.REJECTED });
      });
  }, [searchQuery, currentPage]);

  useLayoutEffect(() => {
    const scrollValue = 100;
    setTimeout(() => {
      window.scrollTo({
        top: window.scrollY + scrollValue,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);
  }, [currentPage]);

  const onSubmit = query => {
    setState({ type: 'resetState' });
    setState({ type: 'saveQuery', payload: query });
  };

  const addLargeImgToState = url =>
    setState({ type: 'setModalImg', payload: url });

  const onLoadMoreClick = () => setState({ type: 'incrementPage' });

  const closeModal = () => setState({ type: 'resetModalImg' });

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {!!images.length && (
        <ImageGallery images={images} addLargeImgToState={addLargeImgToState} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <>
          {totalPages > 1 && currentPage < totalPages && (
            <Button onLoadMoreClick={onLoadMoreClick} />
          )}
          {modalImg.largeImageURL && (
            <Modal modalImg={modalImg} closeModal={closeModal} />
          )}
        </>
      )}
    </>
  );
}
