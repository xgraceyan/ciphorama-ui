export const USDPrecision = 2;
export const CryptoPrecision = 4;


// const localPort = 21003
const localPort = 10000

export const graph_url = "http://localhost:3001/accounts/";
export const planner_url = `http://localhost:${localPort}/v1/wallets`;
export const screened_wallets_url = `http://localhost:${localPort}/v1/wallet-screen`;
export const wallet_detail_url = `http://localhost:3000/wallet-details/`;
export const dashboard_url = `http://localhost:${localPort}/v1/dashboard`;
export const wallet_volume_url = `http://localhost:${localPort}/v1/wallet-volume`;