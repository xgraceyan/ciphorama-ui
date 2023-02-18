import { combineReducers } from "redux";
import AccountReducer from "./AccountReducer";
import TransactionReducer from "./TransactionReducer";
import DashboardReducer from "./DashboardReducer";
import WalletVolumeReducer from "./WalletVolumeReducer";


const RootReducer = combineReducers({
  wallets: AccountReducer,
  transactions: TransactionReducer,
  dashboard: DashboardReducer,
  wallet_volume: WalletVolumeReducer,
});

export default RootReducer;
