const initState = {
  transactions: [
    {
      id: "0xT1",
      amount: 10,
      risk: 1,
      date: 1673312410,
      asset: null,
      fromAccount: "0xa1",
      toAccount: "0xa2",
      entityName: "Uniswap",
      entityType: "services",
      geo: "US",
    },
    {
      id: "0xT2",
      amount: 20,
      risk: 1,
      date: 1673322410,
      asset: null,
      fromAccount: "0xa1",
      toAccount: "0xa3",
      entityName: "Uniswap",
      entityType: "services",
      geo: "US",
    },
    {
      id: "0xT3",
      amount: 30,
      risk: 1,
      date: 1673332410,
      asset: null,
      fromAccount: "0xa2",
      toAccount: "0xa3",
      entityName: "Uniswap",
      entityType: "services",
      geo: "US",
    },
  ],
};

const TransactionReducer = (state = initState, action) => {
  return state;
};

export default TransactionReducer;
