const initialState = {
  jobList: [],
  jobCandidateList: [],
  isJobListDone: false,
  isJobCandidateListDone: false,
  jobMessage: '',
  candidateMessage: '',
  success: null
}

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_JOBS': {
      const { data } = action.payload;
      return { ...state, jobList: data, isJobListDone: true };
    }
    case 'ADD_JOB': {
      const { data, msg, success } = action.payload;
      const jobList = [...state.jobList];
      if (!Object.values(data).every(x => x === undefined)) jobList.unshift(data);
      return { ...state, jobList, jobMessage: msg, success };
    }
    case 'EDIT_JOB': {
      const { data, msg, success } = action.payload;
      let jobList = [...state.jobList];
      jobList = jobList.map((job) => job._id === data._id ? data : job);
      return { ...state, jobList, jobMessage: msg, success };
    }
    case 'GET_JOB_CANDIDATE_LIST': {
      const { data } = action.payload;
      return { ...state, jobCandidateList: data, isJobCandidateListDone: true };
    }
    case 'EMPTY_JOB_CANDIDATE_LIST': {
      return { ...state, jobCandidateList: [], isJobCandidateListDone: false };
    }
    case 'ADD_JOB_CANDIDATE': {
      const { data, msg, success } = action.payload;
      const jobCandidateList = [...state.jobCandidateList];
      if (!Object.values(data).every(x => x === undefined)) jobCandidateList.unshift(data);
      return { ...state, jobCandidateList, jobMessage: msg, success };
    }
    case 'RESET_IS_JOB_LIST_DONE': {
      return { ...state, isJobListDone: false };
    }
    case 'RESET_MESSAGES': {
      return { ...state, jobMessage: '', candidateMessage: '', success: null };
    }
    default:
      return state;
  }
}