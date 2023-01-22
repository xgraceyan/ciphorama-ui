import _ from "underscore";

const initState = {
  accounts: [],
};

// https://stackoverflow.com/questions/39513753/my-redux-state-has-changed-why-doesnt-react-trigger-a-re-render
const AccountReducer = (state = initState, action) => {
  let accounts = state.accounts;
  console.log("AccountReducer: accounts : ", accounts);
  switch (action.type) {
    case "ACCOUNT_LOADING_SUCCESS":
      let curAcct = action.account;
      if (!_.isEmpty(curAcct)) {
        accounts.push(curAcct);
      }
      accounts = _.uniq(accounts, false, e => e.id);
      console.log("single account load success", curAcct, " new accounts ", accounts);
      return {
        ...state,
        currentAcct: curAcct,
        accounts: accounts
      };
    case "ALL_ACCOUNT_LOADING_SUCCESS":
      accounts = action.accounts;
      accounts = _.uniq(accounts, false, e => e.id);
      console.log("all account load success", action.accounts, " new accounts ", accounts);
      return {
        ...state,
        currentAcct: {},
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
