import { reqAddCandidate, reqAddJob, reqJobCandidateList, reqJobList, reqUpdateJob } from "../../api"

export const getJobs = () => async (dispatch) => {
  try {
    const { data } = await reqJobList();
    dispatch({ type: 'GET_JOBS', payload: { data } });
  } catch (error) {
    console.log(error);
  }
}

export const addJob = (title) => async (dispatch) => {
  try {
    const { data, msg, success } = await reqAddJob(title);
    dispatch({ type: 'ADD_JOB', payload: { data, msg, success } });
  } catch (error) {
    console.log(error);
  }
}

export const addJobCandidate = (candidate) => async (dispatch) => {
  try {
    const { data, msg, success } = await reqAddCandidate(candidate);
    dispatch({ type: 'ADD_JOB_CANDIDATE', payload: { data, msg, success } });
  } catch (error) {
    console.log(error);
  }
}

export const editJob = (id, title) => async (dispatch) => {
  try {
    const { data, msg, success } = await reqUpdateJob(id, title);
    dispatch({ type: 'EDIT_JOB', payload: { data, msg, success } });
  } catch (error) {
    console.log(error);
  }
}

export const getJobCandidateList = (jobId) => async (dispatch) => {
  try {
    const { data } = await reqJobCandidateList(jobId);
    dispatch({ type: 'GET_JOB_CANDIDATE_LIST', payload: { data } });
  } catch (error) {
    console.log(error);
  }
}

export const emptyJobCandidateList = () => ({ type: 'EMPTY_JOB_CANDIDATE_LIST' });

export const resetIsJobListDone = () => ({ type: 'RESET_IS_JOB_LIST_DONE' });

export const resetMessages = () => ({ type: 'RESET_MESSAGES' });
