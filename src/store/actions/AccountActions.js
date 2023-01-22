import _ from "underscore";

export const fetchAccount = (account, graph_url, props) => {
  const accounts_url = graph_url + "/" + account;
  return (dispatch) => {
    fetch(accounts_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (acct) => {
          console.log(
            "fetching single account request:",
            accounts_url,
            " acct: ",
            acct,
            " props:",
            props
          );
          if (!_.isEmpty(acct)) {
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
