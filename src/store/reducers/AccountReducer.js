import _ from "underscore";

// this reducer responsibel for accounts ary and currentWallet;
const initState = {
  wallets: [],
};

// https://stackoverflow.com/questions/39513753/my-redux-state-has-changed-why-doesnt-react-trigger-a-re-render
const AccountReducer = (state = initState, action) => {
  let wallets = state.wallets;
  switch (action.type) {
    case "ACCOUNT_LOADING_SUCCESS":
      let curWallet = action.wallet.wallet;
      curWallet.transactions = action.wallet.transactions;
      if (!_.isEmpty(curWallet)) {
        wallets.push(curWallet);
      }
      wallets = _.uniq(wallets);
      console.log(
        "single wallet load success",
        curWallet,
        " new wallets ",
        wallets
      );
      return {
        ...state,
        currentWallet: curWallet,
        wallets: wallets,
      };
    case "ALL_ACCOUNT_LOADING_SUCCESS": 
      wallets = action.wallets;
      wallets = _.uniq(action.wallets, false, (e) => e.address);
      console.log(
        "all wallets load success",
        action.wallets,
        " filterd wallets ",
        wallets
      );
      return {
        ...state,
        currentWallet: {},
        wallets: wallets,
      };
    case "ACCOUNT_LOADING_FAILURE":
      console.log("wallet load failure", action.error);
      return {
        ...state,
        currentWallet: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default AccountReducer;
