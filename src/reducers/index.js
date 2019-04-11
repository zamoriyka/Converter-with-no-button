const initialState = {
  currency: []
};

function currency(state = initialState, action) {
  switch (action.type) {
    case "GET_CURRENCY_SUCCES":
      return {
        ...state,
        currency: action.payload
      };
    default:
      return state;
  }
}

export default currency;
