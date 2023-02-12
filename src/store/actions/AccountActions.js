import _ from "underscore";
import { Buffer } from "buffer";
import { graph_url, planner_url, screened_wallets_url} from "../../Constants";


export const fetchWallet = (wallet) => {
  return (dispatch) => {
    // const account_url = graph_url + account;
    // const wallet = "0x04786aada9deea2150deab7b3b8911c309f5ed90";
    const account_url = planner_url + "?id=" + wallet;
    console.log("fetching wallet url ", account_url);
    fetch(account_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (wallet) => {
          if (!_.isEmpty(wallet) && !_.isEmpty(wallet.blob)) {
            wallet = JSON.parse(Buffer.from(wallet.blob, "base64"));
            dispatch({ type: "ACCOUNT_LOADING_SUCCESS", wallet: wallet });
          } else if (!_.isEmpty(wallet)) {
            dispatch({ type: "ACCOUNT_LOADING_SUCCESS", wallet: wallet });
          } else {
            dispatch({
              type: "ACCOUNT_LOADING_FAILURE",
              error: "empty wallet",
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
    const screen_url = screened_wallets_url; // graph_url
    console.log("fecthing screen wallets ", screen_url);
    fetch(screen_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (wallets) => {
          console.log(wallets);
          if (!_.isEmpty(wallets) && !_.isEmpty(wallets.blob)) {
            wallets = JSON.parse(Buffer.from(wallets.blob, "base64"));
            console.log("screen wallet loading ", wallets.wallets);
            dispatch({
              type: "ALL_ACCOUNT_LOADING_SUCCESS",
              wallets: wallets.wallets,
            });
          } else if (!_.isEmpty(wallets)) {
            dispatch({ type: "ALL_ACCOUNT_LOADING_SUCCESS", wallets: wallets });
          } else {
            dispatch({
              type: "ACCOUNT_LOADING_FAILURE",
              error: "empty wallets",
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
