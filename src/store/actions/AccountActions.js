import _ from "underscore";

export const fetchAccount = (account, graph_url, props) => {
  const accounts_url = graph_url + "/" + account;
  return (dispatch) => {
    fetch(accounts_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (acct) => {
          console.log(
            "graph ajax request:",
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
        (acct) => {
          console.log(
            "graph ajax request:",
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
