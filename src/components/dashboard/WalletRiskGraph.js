import { Bar } from "@ant-design/plots";
import React from "react";
import { connect } from "react-redux";
import { fetchScreenedWallets } from "../../store/actions/AccountActions";
import { riskColorCode } from "../Utils";

function WalletRiskGraph(props) {
  React.useEffect(() => {
    props.fetchScreenedWallets();
  }, []);

  var graphData = [
    {
      label: "Critical",
      count: 0,
    },
    {
      label: "High",
      count: 0,
    },
    {
      label: "Medium",
      count: 0,
    },
    {
      label: "Low",
      count: 0,
    },
  ];

  for (const wallet of props.wallets) {
    if (wallet.risk === "Critical") graphData[0].count++;
    if (wallet.risk === "High") graphData[1].count++;
    if (wallet.risk === "Medium") graphData[2].count++;
    if (wallet.risk === "Low") graphData[3].count++;
  }

  const config = {
    data: graphData,
    xField: "count",
    yField: "label",
    seriesField: "label",
    legend: {
      position: "left",
    },
    barWidthRatio: 0.5,
    marginRatio: 0.5,
    intevalPadding: 0,
    colorField: "type",
    color: [
      riskColorCode("Critical"),
      riskColorCode("High"),
      riskColorCode("Medium"),
      riskColorCode("Low"),
    ],
  };

  return <Bar {...config} style={{ height: "250px" }} />;
}

const mapStateToProps = (state) => {
  return {
    currentWallet: state.wallets.currentWallet,
    wallets: state.wallets.wallets,
    transactions: state.transactions.transactions,
    ...state.dashboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScreenedWallets: () => dispatch(fetchScreenedWallets()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletRiskGraph);
