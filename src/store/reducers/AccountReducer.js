import _ from "underscore";

const initState = {
  accounts: [],
};

const AccountReducer = (state = initState, action) => {
  switch (action.type) {
    case "ACCOUNT_LOADING_SUCCESS":
      let curAcct = action.account;
      let accounts = state.accounts;
      if (!_.isEmpty(curAcct)) {
        accounts.push(curAcct);
      }
      accounts = _.uniq(accounts, false, e => e.id);
      console.log("account load success", curAcct, " state accounts ", accounts, " new accounts ", accounts);
      return {
        ...state,
        currentAcct: curAcct,
        accounts: accounts
      };
    case "ACCOUNT_LOADING_FAILURE":
      console.log("account load failure", action.error);
      return {
        ...state,
        currentAcct: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default AccountReducer;
