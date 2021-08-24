const initialState = {
  eventList: [],
  eventMessage: '',
  success: null
}

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENTS': {
      const eventList = action.payload;
      return { ...state, eventList };
    }
    case 'ADD_EVENT': {
      const { data, msg, success } = action.payload;
      let list = [...state.list];
      list.unshift(data);
      return { ...state, list, eventMessage: msg, success: success }
    }
    default:
      return state;
  }
}
