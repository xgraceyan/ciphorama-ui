import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Table, Tag, Space, Input, Button, DatePicker } from "antd";
import { SearchOutlined, SignalFilled } from "@ant-design/icons";
import { fetchAccount } from "../../store/actions/AccountActions";
import moment from "moment";
import _ from "underscore";

function WalletScanTable(props) {
  const riskColor = (risk, name) => {
    if (risk == "High") return <div style={{ color: "#f5222d" }}>{name}</div>;
    if (risk == "Medium") return <div style={{ color: "#ffc53d" }}>{name}</div>;
    if (risk == "Low") return <div style={{ color: "#52c41a" }}>{name}</div>;
  };

  const columns = [
    {
      title: "Scanned Time",
      dataIndex: "scanTime",
      key: "scanTime",
      render: (text) => moment.unix(text).format("YYYY-MM-DD hh:mm:ss"),
    },
    {
      title: "Scanned By",
      dataIndex: "scannedBy",
      key: "scannedBy",
    },
    {
      title: "Risk Identified",
      dataIndex: "risk",
      key: "risk",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Volume (USD)",
      dataIndex: "volume",
      key: "volume",
      render: (text) => text + " USD",
    },
  ];

  const data = [];

  if (!_.isEmpty(props.currentAcct)) {
    for (const txn of props.currentAcct.scans) {
      console.log("WalletDetails txn", txn);
      data.push({
        key: txn.id,
        scanTime: txn.scanTime,
        scannedBy: txn.scannedBy,
        risk: riskColor(txn.risk, txn.risk),
        category: riskColor(txn.risk, txn.category),
        asset: txn.asset,
        volume: txn.volume,
      });
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ["bottomRight"] }}
      rowClassName="tableRow"
    />
  );
}

// map the entire redux store state to props.
const mapStateToProps = (state) => {
  return {
    currentAcct: state.accounts.currentAcct,
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(WalletScanTable);
