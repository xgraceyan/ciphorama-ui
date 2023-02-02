import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Table, Tag, Space, Input, Button, DatePicker } from "antd";
import { SearchOutlined, SignalFilled } from "@ant-design/icons";
import { fetchAccount } from "../../store/actions/AccountActions";
import moment from "moment";
import _ from "underscore";

function WalletDetailsTable(props) {
  const riskColor = (risk, name) => {
    if (risk == "High") return <div style={{ color: "#f5222d" }}>{name}</div>;
    if (risk == "Medium") return <div style={{ color: "#ffc53d" }}>{name}</div>;
    if (risk == "Low") return <div style={{ color: "#52c41a" }}>{name}</div>;
  };

  const riskTriggeredColor = (text) => {
    var riskArr = [];
    text.forEach((risk) => {
      riskArr.push(riskColor(risk.risk, risk.name));
    });
    return riskArr;
  };

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
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
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

  console.log("loading WalletDetailsTable props ", props);
  const data = [];
  if (!_.isEmpty(props.currentAcct)) {
    for (const txn of props.currentAcct.transactions) {
      console.log("WalletDetails txn", txn);
      data.push({
        key: txn.id,
        transactionId: txn.id,
        risk: riskColor(txn.risk, txn.risk),
        riskTriggered: riskColor(txn.risk, txn.riskTriggered),
        direction: txn.direction,
        counterAddress: txn.counterAddress,
        counterEntity: txn.counterEntity,
        asset: txn.asset,
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
    currentAcct: state.accounts.currentAcct,
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(WalletDetailsTable);
