import _ from "underscore";
import { Buffer } from "buffer";
import { graph_url, planner_url, screened_wallets_url, dashboard_url, wallet_volume_url} from "../../Constants";


export const fetchWallet = (wallet, save_wallet = false) => {
  return (dispatch) => {
    // const account_url = graph_url + account;
    // const wallet = "0x04786aada9deea2150deab7b3b8911c309f5ed90";
    var account_url = planner_url + "?id=" + wallet;
    if (save_wallet) {
      account_url += "&save=true";
      console.log("save")
    }
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

export const fetchDashboard = () => {
  return (dispatch) => {
    const url = dashboard_url; // graph_url
    console.log("fecthing dashboard ", dashboard_url);
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (dashboard) => {
          console.log("fetch dashboard response: ", dashboard);
          if (!_.isEmpty(dashboard) && !_.isEmpty(dashboard.blob)) {
            dashboard = JSON.parse(Buffer.from(dashboard.blob, "base64"));
            dispatch({
              type: "DASHBOARD_LOADING_SUCCESS",
              dashboard,
            });
          } else if (!_.isEmpty(dashboard)) {
            dispatch({ 
              type: "DASHBOARD_LOADING_SUCCESS", 
              dashboard 
            });
          } else {
            dispatch({
              type: "DASHBOARD_LOADING_FAILURE",
              error: "empty dashboard",
            });
          }
        },
        (error) => {
          dispatch({ type: "DASHBOARD_LOADING_FAILURE", error });
        }
      )
      .catch(console.log);
  };
}

export const fetchWalletVolume = (wallet) => {
  return (dispatch) => {
    var volume_url = wallet_volume_url + "?id=" + wallet;
    console.log("fetchWalletVolume ", volume_url);
    fetch(volume_url, { method: "GET" })
      .then((response) => response.json())
      .then(
        (wallet_volume) => {
          if (!_.isEmpty(wallet_volume) && !_.isEmpty(wallet_volume.blob)) {
            wallet_volume = JSON.parse(Buffer.from(wallet_volume.blob, "base64"));
            // console.log(wallet_volume)
            dispatch({ type: "WALLET_VOLUME_LOADING_SUCCESS", wallet_volume });
          } else if (!_.isEmpty(wallet_volume)) {
            dispatch({ type: "WALLET_VOLUME_LOADING_SUCCESS", wallet_volume });
          } else {
            dispatch({
              type: "WALLET_VOLUME_LOADING_FAILURE",
              error: "empty wallet volume",
            });
          }
        },
        (error) => {
          dispatch({ type: "WALLET_VOLUME_LOADING_FAILURE", error });
        }
      )
      .catch(console.log);
  };
}