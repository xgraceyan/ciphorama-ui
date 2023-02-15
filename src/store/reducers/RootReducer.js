import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import TransactionReducer from "./TransactionReducer";
import DashboardReducer from "./DashboardReducer";

const RootReducer = combineReducers({
  wallets: AccountReducer,
  transactions: TransactionReducer,
  dashboard: DashboardReducer,
});

export default RootReducer;
