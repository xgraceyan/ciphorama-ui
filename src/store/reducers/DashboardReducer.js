import _ from "underscore";

// this reducer responsibel for accounts ary and currentWallet;
const initState = {
  dashboard: {},
};

// https://stackoverflow.com/questions/39513753/my-redux-state-has-changed-why-doesnt-react-trigger-a-re-render
const DashboardReducer = (state = initState, action) => {
  let dashboard = state.dashboard;
  switch (action.type) {
    case "DASHBOARD_LOADING_SUCCESS":
      console.log("Dashboard load successfully. ", action.dashboard );
      return {
        ...state,
        dashboard: action.dashboard,
      };
    default:
      console.log(" DashboardReducer unknown action: ", action);
      return {
        ...state,
      }
  }
};

export default DashboardReducer;
