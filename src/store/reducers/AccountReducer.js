const initState = {
  accounts: [
    {
      id: "0xa1",
      owner: "usdcoin",
      ownerId: "1",
      type: "services",
      country: "US",
      risk: 9,
      currentBalance: 123.456789,
      received: 149.15499744,
      receivedTransactions: 25636833,
      sent: 0,
      sentTransactions: 0,
    },
  ],
};

const AccountReducer = (state = initState, action) => {
  return state;
};

export default AccountReducer;
