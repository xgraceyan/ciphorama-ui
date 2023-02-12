import moment from "moment";
import _ from "underscore";
import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Table, Tag, Space, Input, Button, DatePicker } from "antd";
import { SearchOutlined, SignalFilled } from "@ant-design/icons";
import { 
  riskColor, 
  riskTriggeredColor, 
  riskScoreCalc, 
  formatDate, 
  convertToPrecision, 
  shortenAddress, 
  EthereumIcon, 
  generateWalletUrl,
  riskBadgeColor,
  TextWithBoxColor
} from "../Utils";
import { CryptoPrecision } from "../../Constants";


function WalletDetailsTable(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
      record[dataIndex]
        ? moment(record[dataIndex]).isBetween(
            moment(value[0]).format("YYYY-MM-DD"),
            moment(value[1]).format("YYYY-MM-DD"),
            "day",
            "[]"
          )
        : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => formatDate(text), // moment.unix(text).format("YYYY-MM-DD hh:mm:ss"),
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
      render: (text)=> generateWalletUrl(text),
      sorter: (a, b) => a.value < b.value,
    },
    {
      title: "To",
      dataIndex: "toAddress",
      key: "toAddress",
      render: (text)=> generateWalletUrl(text),
      sorter: (a, b) => a.value < b.value,
    },
    // {
    //   title: "Counterparty Address",
    //   dataIndex: "counterAddress",
    //   key: "counterAddress",
    // },
    // {
    //   title: "Counterparty Entity",
    //   dataIndex: "counterEntity",
    //   key: "counterEntity",
    // },
    {
      title: "Asset",
      dataIndex: "assetType",
      key: "assetType",
      render: () => EthereumIcon(),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text) => convertToPrecision(text, CryptoPrecision),
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Activity Time",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
      filterIcon: <SignalFilled />,
    },
  ];

  console.log("rendering WalletDetailsTable props ", props);
  const data = [];
  if (!_.isEmpty(props.currentWallet) && !_.isEmpty(props.currentWallet.transactions)) {
    console.log(props.currentWallet.transactions)
    for (const txn of props.currentWallet.transactions) {
      // console.log(txn)
      data.push({
        key: txn.id,
        transactionId: txn.id,
        risk: riskColor(txn.risk, txn.risk),
        // risk: colorCodedNumber(txn.riskScore, riskBadgeColor(txn.risk)),
        riskTriggered: TextWithBoxColor(txn.riskTriggered, "#A9CCE3"),
        direction: txn.direction,
        fromAddress: txn.fromAddress,
        toAddress: txn.toAddress,
        counterEntity: txn.counterEntity,
        assetType: txn.assetType,
        value: txn.value,
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
