import moment from "moment";
import _ from "underscore";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Tag, Space, Input, Button, DatePicker } from "antd";
import { SearchOutlined, SignalFilled } from "@ant-design/icons";
import {
  riskColor,
  formatDate,
  convertToPrecision,
  EthereumIcon,
  generateWalletUrl,
  TextWithBoxColor,
  riskCategoryCalc,
  riskBadgeColor,
} from "../Utils";
import { CryptoPrecision, USDPrecision } from "../../Constants";

function WalletDetailsTable(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
          marginRight: 10,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <DatePicker.RangePicker
          style={{ marginBottom: 8, display: "block" }}
          popupStyle={{ margin: 0 }}
          value={selectedKeys[0]}
          className="table-date-picker"
          onChange={(e) => setSelectedKeys(e ? [e] : [])}
          onPressEnter={() => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 100,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      moment(record[dataIndex]).isBetween(
        moment(value[0].$d),
        moment(value[1].$d)
      ),
    render: (text) => formatDate(text),
  });

  const columns = [
    {
      title: "Severity",
      dataIndex: "risk",
      key: "risk",
    },
    {
      title: "Risk Triggered",
      dataIndex: "riskTriggered",
      key: "riskTriggered",
      sorter: (a, b) => a.value < b.value,
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
    },
    {
      title: "From",
      dataIndex: "fromAddress",
      key: "fromAddress",
      render: (text) => generateWalletUrl(text),
      sorter: (a, b) => a.value < b.value,
    },
    {
      title: "To",
      dataIndex: "toAddress",
      key: "toAddress",
      render: (text) => generateWalletUrl(text),
      sorter: (a, b) => a.value < b.value,
    },
    {
      title: "Asset",
      dataIndex: "assetType",
      key: "assetType",
      render: () => EthereumIcon(),
    },
    {
      title: "Amount",
      dataIndex: "value",
      key: "value",
      render: (text) => convertToPrecision(text, CryptoPrecision),
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: "Value (USD)",
      dataIndex: "usdValue",
      key: "usdValue",
      render: (text) => convertToPrecision(text, CryptoPrecision),
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: "Activity Time",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ...getColumnSearchProps("date"),
      filterIcon: <SignalFilled />,
    },
  ];

  console.log("rendering WalletDetailsTable props ", props);
  const data = [];
  if (
    !_.isEmpty(props.currentWallet) &&
    !_.isEmpty(props.currentWallet.transactions)
  ) {
    console.log(props.currentWallet.transactions);
    for (const txn of props.currentWallet.transactions) {
      // console.log(txn)
      data.push({
        key: txn.id,
        transactionId: txn.id,
        risk: riskColor(txn.risk, txn.risk),
        // risk: colorCodedNumber(txn.riskScore, riskBadgeColor(txn.risk)),
        riskTriggered: TextWithBoxColor(
          txn.riskTriggered,
          riskBadgeColor(riskCategoryCalc(txn.riskTriggered)),
          txn.riskScore
        ),
        direction: txn.direction,
        fromAddress: txn.fromAddress,
        toAddress: txn.toAddress,
        counterEntity: txn.counterEntity,
        assetType: txn.assetType,
        value: txn.value,
        usdValue: convertToPrecision(txn.value * 1560, USDPrecision),
        customer: txn.customer,
        date: txn.activityTime,
      });
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ["bottomRight"], defaultPageSize: 20 }}
      rowClassName="tableRow"
    />
  );
}

// map the entire redux store state to props.
const mapStateToProps = (state) => {
  return {
    currentWallet: state.wallets.currentWallet,
    wallets: state.wallets.wallets,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(WalletDetailsTable);
