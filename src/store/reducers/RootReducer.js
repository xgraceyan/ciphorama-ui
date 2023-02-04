import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import TransactionReducer from "./TransactionReducer";

const RootReducer = combineReducers({
  wallets: AccountReducer,
  transactions: TransactionReducer,
});

export default RootReducer;
