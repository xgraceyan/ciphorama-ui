import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Table, Tag, Space, Input, Button, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function DashboardTable(props) {
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
    render: (text) => moment.unix(text).format("MMM DD, YYYY LT"),
  });

  const columns = [
    {
      title: "Risk",
      dataIndex: "risk",
      key: "risk",
    },
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "From",
      dataIndex: "fromId",
      key: "fromId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "To",
      dataIndex: "toId",
      key: "toId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Geo",
      dataIndex: "geo",
      key: "geo",
    },
  ];

  const data = [];
  for (const txn of props.transactions) {
    data.push({key: txn.id, transactionId: txn.id, date: txn.date});
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ["topRight"] }}
    />
  );
}

// map the entire redux store state to props.
const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(DashboardTable);
