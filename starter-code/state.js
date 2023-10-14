const useSelect = () => {
  let state = '';
  const setState = (newState) => {
    state = newState;
  };
  const getState = () => state;
  return [getState, setState];
};

const useInvoices = (cb) => {
  let state = [];
  const setState = (newState) => {
    state = newState;
    cb(state);
  };

  const getState = () => state;
  const updateState = (newState) => {
    state = state.map((s) => {
      if (s.id === newState.id) {
        return newState;
      } else {
        return s;
      }
    });
  };

  const addSingle = (newState) => {
    state = state.concat(newState);
  };

  const deleteState = (id) => {
    state = state.filter((s) => s.id !== id);
    cb(state);
  };
  return [getState, setState, updateState, deleteState, addSingle];
};
