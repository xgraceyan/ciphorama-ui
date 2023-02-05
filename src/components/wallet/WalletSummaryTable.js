import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Tag, Space, Inflow, Button, DatePicker } from "antd";
import { SearchOutlined, SignalFilled } from "@ant-design/icons";
import { riskColor, riskScoreCalc, riskTriggeredColor } from "./Utils";
import moment from "moment";
import _ from "underscore";

function WalletSummaryTable(props) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInflow = useRef(null);
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
        setTimeout(() => searchInflow.current?.select(), 100);
      }
    },
    render: (text) => text, // moment.unix(text).format("YYYY-MM-DD hh:mm:ss"),
  });

  const columns = [
    {
      title: "Risk",
      dataIndex: "risk",
      key: "risk",
      filters: [
        {
          text: "High",
          value: "High",
        },
        {
          text: "Medium",
          value: "Medium",
        },
        {
          text: "Low",
          value: "Low",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.risk.props.children.startsWith(value),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <Link to={"/wallet-details/" + text}>{text}</Link>
      ),
    },
    {
      title: "Risk Triggered",
      dataIndex: "riskTriggered",
      key: "riskTriggered",
    },
    {
      title: "AssetType",
      dataIndex: "assetType",
      key: "assetType",
      filters: [
        {
          text: "ETH",
          value: "ETH",
        },
        {
          text: "BNB",
          value: "BNB",
        },
        {
          text: "BTC",
          value: "BTC",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.asset.startsWith(value),
    },
    {
      title: "Inflow (USD)",
      dataIndex: "inflow",
      key: "inflow",
      render: (text) => text + " USD",
      sorter: (a, b) => a.inflow - b.inflow,
    },
    {
      title: "Outflow (USD)",
      dataIndex: "outflow",
      key: "outflow",
      render: (text) => text + " USD",
      sorter: (a, b) => a.outflow - b.outflow,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
      filterIcon: <SignalFilled />,
    },
  ];

  console.log("loading WalletSummaryTable, props ", props);
  const data = [];
  if (!_.isEmpty(props.wallets)) {
    for (const wallet of props.wallets) {
      data.push({
        key: wallet.id,
        transactionId: wallet.id,
        risk: riskColor(
          riskScoreCalc(wallet.riskScore),
          riskScoreCalc(wallet.riskScore)
        ),
        address: wallet.address,
        riskTriggered: riskTriggeredColor(wallet.riskTriggered),
        assetType: wallet.assetType,
        inflow: wallet.inflow,
        outflow: wallet.outflow,
        customer: wallet.customer,
        date: wallet.screenTime,
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
    currentWallet: state.wallets.currentWallet,
    wallets: state.wallets.wallets,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(WalletSummaryTable);
