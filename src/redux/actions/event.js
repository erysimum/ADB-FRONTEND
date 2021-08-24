import { reqAddTimeline, reqTimeline } from "../../api";

export const getEvents = (id) => async (dispatch) => {
  try {
    // console.log(id);
    const { data } = await reqTimeline(id);
    dispatch({ type: 'GET_EVENTS', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const addEvent = (event) => async (dispatch) => {
  try {
    const { data, msg, success } = await reqAddTimeline(event);
    dispatch({ type: 'ADD_EVENT', payload: { data, msg, success } });
  } catch (error) {
    console.log(error);
  }
}