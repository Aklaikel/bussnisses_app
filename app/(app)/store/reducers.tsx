const initialState = {
    email : undefined,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "setTheme":
        return {
          ...state,
          email: action.payload,
        };
      default:
        return state;
    }
  }
  export default reducer