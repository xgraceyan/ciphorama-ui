import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Table, Tag, Space, Input, Button, DatePicker } from "antd";
import { SearchOutlined, SignalFilled } from "@ant-design/icons";
import { riskColor, riskTriggeredColor } from "./Utils";
import moment from "moment";
import _ from "underscore";

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
    render: (text) => text, // moment.unix(text).format("YYYY-MM-DD hh:mm:ss"),
  });

  const columns = [
    {
      title: "Risk Severity",
      dataIndex: "risk",
      key: "risk",
    },
    {
      title: "Risk Triggered",
      dataIndex: "riskTriggered",
      key: "riskTriggered",
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
    },
    {
      title: "Counterparty Address",
      dataIndex: "counterAddress",
      key: "counterAddress",
    },
    {
      title: "Counterparty Entity",
      dataIndex: "counterEntity",
      key: "counterEntity",
    },
    {
      title: "AssetType",
      dataIndex: "assetType",
      key: "assetType",
    },
    {
      title: "Volume (USD)",
      dataIndex: "volume",
      key: "volume",
      render: (text) => text + " USD",
      sorter: (a, b) => a.volume - b.volume,
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
  if (!_.isEmpty(props.currentWallet)) {
    for (const txn of props.currentWallet.transactions) {
      console.log("WalletDetails txn", txn);
      data.push({
        key: txn.id,
        transactionId: txn.id,
        risk: riskColor(txn.risk, txn.risk),
        riskTriggered: riskColor(txn.risk, txn.riskTriggered),
        direction: txn.direction,
        counterAddress: txn.counterAddress,
        counterEntity: txn.counterEntity,
        asset: txn.assetType,
        volume: txn.volume,
        customer: txn.customer,
        date: txn.activityTime,
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

export default connect(mapStateToProps)(WalletDetailsTable);
