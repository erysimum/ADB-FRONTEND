import { reqAddCandidate, reqCandidate, reqCandidateList, reqSearch, reqSearchCandidates, reqUpdateCandidate, reqUpdateIsRead } from "../../api";

export const addCandidate = (candidate, fileName) => async (dispatch) => {
  try {
    const { data, msg, success } = await reqAddCandidate(candidate, fileName);
    dispatch({ type: 'ADD_CANDIDATE', payload: { data, msg, success } });
  } catch (error) {
    console.log(error);
  }
}

export const getCandidates = () => async (dispatch) => {
  try {
    const { data } = await reqCandidateList();
    dispatch({ type: 'GET_CANDIDATES', payload: { data } });
  } catch (error) {
    console.log(error);
  }
}

export const getCandidate = (id) => async (dispatch) => {
  try {
    const { data } = await reqCandidate(id);
    dispatch({ type: 'GET_CANDIDATE', payload: { data } });
  } catch (error) {
    console.log(error);
  }
}

export const updateIsRead = (id) => async (dispatch) => {
  try {
    // console.log(id);
    const { data } = await reqUpdateIsRead(id);
    dispatch({ type: 'UPDATE_IS_READ', payload: { data } });
  } catch (error) {
    console.log(error);
  }
}

export const editCandidate = (candidate, fileName) => async (dispatch) => {
  try {
    const { data, msg, success } = await reqUpdateCandidate(candidate, fileName);
    dispatch({ type: 'EDIT_CANDIDATE', payload: { data, msg, success } });
  } catch (error) {
    console.log(error);
  }
}

export const searchCandidate = (searchType, searchInput) => async (dispatch) => {
  try {
    const { data, msg, success } = await reqSearchCandidates(searchType, searchInput);
    dispatch({ type: 'SEARCH_CANDIDATE', payload: { data, msg, success } });
  } catch (error) {
    console.log(error);
  }
}

export const advancedSearch = (text, conditions) => async (dispatch) => {
  try {
    const { data, msg } = await reqSearch({ text }, conditions);
    dispatch({ type: 'ADVANCED_SEARCH', payload: { data, msg } });
  } catch (error) {
    console.log(error);
  }
}

export const emptyAdvancedSearch = () => ({ type: 'EMPTY_ADVANCED_SEARCH' });

export const emptyCandidate = () => ({ type: 'EMPTY_CANDIDATE' });

export const resetMessage = () => ({ type: 'RESET_MESSAGE' });