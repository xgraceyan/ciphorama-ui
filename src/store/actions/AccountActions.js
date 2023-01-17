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
            " getState:",
            props
          );
          dispatch({ type: "ACCOUNT_LOADING_SUCCESS", accounts: acct });
        },
        (error) => {
          dispatch({ type: "ACCOUNT_LOADING_FAILURE", error });
        }
      )
      .catch(console.log);
  };
};
