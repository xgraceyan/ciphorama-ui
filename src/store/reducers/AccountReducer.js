const initState = {
  accounts: [],
};

const AccountReducer = (state = initState, action) => {
  switch (action.type) {
    case "ACCOUNT_LOADING_SUCCESS":
      console.log("account load success", action.accounts);
      return {
        ...state,
        accounts: action.accounts,
      };
    case "ACCOUNT_LOADING_FAILURE":
      console.log("account load failure", action.error);
      return {
        ...state,
        accounts: [],
      };
    default:
      console.log("account reducer action: ", action);
      return {
        ...state,
      };
  }
};

export default AccountReducer;
