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
      sent: 1,
      sentTransactions: 1,
    },
  ]
};

const AccountReducer = (state = initState, action) => {
  switch(action.type) {
    default:
      console.log("account reducer action: ", action);
  };
  return state;
};

export default AccountReducer;
