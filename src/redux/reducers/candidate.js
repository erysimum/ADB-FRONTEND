const initialState = {
  candidateList: [],
  searchedCandidate: [],
  isCandidateListDone: false,
  isSearchedCandidateDone: false,
  candidateMessage: '',
  success: null,
  candidate: {},
}

export const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CANDIDATES': {
      const { data } = action.payload;
      return { ...state, candidateList: data, isCandidateListDone: true };
    }
    case 'GET_CANDIDATE': {
      const { data } = action.payload;
      return { ...state, candidate: data };
    }
    case 'EMPTY_CANDIDATE': {
      return { ...state, candidate: {} };
    }
    case 'SEARCH_CANDIDATE': {
      const { data } = action.payload;
      return { ...state, searchedCandidate: data, isSearchedCandidateDone: true };
    }
    case 'ADVANCED_SEARCH': {
      const { data } = action.payload;
      return { ...state, searchedCandidate: data };
    }
    case 'EMPTY_ADVANCED_SEARCH': {
      return { ...state, searchedCandidate: [], candidateMessage: '', isSearchedCandidateDone: false, isCandidateListDone: false };
    }
    case 'EDIT_CANDIDATE': {
      const { data, msg, success } = action.payload;
      let candidateList = [...state.candidateList];
      candidateList = candidateList.map((candidate) => candidate._id === data._id ? data : candidate)
      return { ...state, candidateList, candidateMessage: msg, success };
    }
    case 'UPDATE_IS_READ': {
      const { data } = action.payload;
      let candidateList = [...state.candidateList];
      candidateList = candidateList.map((candidate) => candidate._id === data._id ? data : candidate)
      return { ...state, candidateList };
    }
    case 'ADD_CANDIDATE': {
      const { data, msg, success } = action.payload;
      let candidateList = [...state.candidateList];
      if (!Object.values(data).every(x => x === undefined)) candidateList.unshift(data);
      return { ...state, candidateList, candidateMessage: msg, success: success };
    }
    case 'RESET_MESSAGE': {
      return { ...state, candidateMessage: '', success: null };
    }
    default:
      return state;
  }
}