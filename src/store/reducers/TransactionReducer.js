const initState = {
  transactions: [
    {
      id: "0xb1",
      amount: 0,
      risk: 1,
      date: 1673312410,
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
