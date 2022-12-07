const stateReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'saveQuery':
      return { ...state, searchQuery: payload };
    case 'resetState':
      return { ...state, currentPage: 1, images: [] };
    case 'setStatus':
      return { ...state, status: payload };
    case 'addImages':
      return { ...state, images: [...state.images, ...payload] };
    case 'setModalImg':
      return { ...state, modalImg: payload };
    case 'resetModalImg':
      return { ...state, modalImg: '' };
    case 'incrementPage':
      return { ...state, currentPage: state.currentPage + 1 };
    case 'saveTotalPages':
      return { ...state, totalPages: payload };
    default:
      console.log(`Unknown action in stateReducer, component App`);
  }
};

export { stateReducer };
