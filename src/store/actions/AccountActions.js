import _ from "underscore";
import { Buffer } from "buffer";

const graph_url = "http://localhost:3001/accounts/";
const planner_url = "http://localhost:10000/v1/accounts";
const screened_wallets_url = "http://localhost:10000/v1/wallets"

export const fetchAccount = (account) => {
  return (dispatch) => {
    const account = "0x04786aada9deea2150deab7b3b8911c309f5ed90";
    const account_url = planner_url + "?id=" + account;
    console.log("fetching account url ", account_url);
    fetch(account_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (acct) => {
          if (!_.isEmpty(acct) && !_.isEmpty(acct.blob)) {
            acct = JSON.parse(Buffer.from(acct.blob, 'base64'));
            dispatch({ type: "ACCOUNT_LOADING_SUCCESS", account: acct });
          } else {
            dispatch({
              type: "ACCOUNT_LOADING_FAILURE",
              error: "empty account",
            });
          }
        },
        (error) => {
          dispatch({ type: "ACCOUNT_LOADING_FAILURE", error });
        }
      )
      .catch(console.log);
  };
};

export const fetchScreenedWallets = () => {
  return (dispatch) => {
    fetch(screened_wallets_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (wallets) => {
          if (!_.isEmpty(wallets)) {
            dispatch({ type: "ALL_ACCOUNT_LOADING_SUCCESS", accounts: wallets });
          } else {
            dispatch({
              type: "ACCOUNT_LOADING_FAILURE",
              error: "empty accounts",
            });
          }
        },
        (error) => {
          dispatch({ type: "ACCOUNT_LOADING_FAILURE", error });
        }
      )
      .catch(console.log);
  };
};
