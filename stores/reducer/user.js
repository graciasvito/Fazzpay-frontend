const initialState = {
  data: [], //for store the data
  msg: "",
  pagination: {},
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER_PENDING": {
      return {
        ...state,
        data: [],
      };
    }
    case "GET_DATA_USER_FULFILLED": {
      return {
        ...state,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default event;
