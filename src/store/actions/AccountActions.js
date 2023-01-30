import _ from "underscore";
import { Buffer } from "buffer";

export const fetchAccount = (account, account_url, props) => {
  return (dispatch) => {
    console.log("fetching account url ", account_url);
    fetch(account_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (acct) => {
          console.log(
            "fetching single account request:",
            account_url,
            " acct: ",
            acct,
            " props:",
            props
          );
          if (!_.isEmpty(acct)) {
            if (!_.isEmpty(acct.blob)) {
              acct = JSON.parse(Buffer.from(acct.blob, 'base64'));
              console.log("decoding blob to ", acct);
            }
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

export const fetchAccounts = (graph_url, props) => {
  const accounts_url = graph_url + "/";
  return (dispatch) => {
    fetch(accounts_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (accounts) => {
          console.log(
            "fetching all accounts: ",
            accounts_url,
            " accounts: ",
            accounts,
            " props:",
            props
          );
          if (!_.isEmpty(accounts)) {
            dispatch({ type: "ALL_ACCOUNT_LOADING_SUCCESS", accounts: accounts });
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
