import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Tag, Space, Input, Button, DatePicker } from "antd";
import { SearchOutlined, SignalFilled } from "@ant-design/icons";
import { fetchAccount } from "../../store/actions/AccountActions";
import moment from "moment";
import _ from "underscore";

function WalletSummaryTable(props) {
  const navigate = useNavigate();

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
    render: (text) => moment.unix(text).format("YYYY-MM-DD hh:mm:ss"),
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
        <Link to={"/wallet-details/" + record.key}>{text}</Link>
      ),
    },
    {
      title: "Risk Triggered",
      dataIndex: "riskTriggered",
      key: "riskTriggered",
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
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
      title: "Input (USD)",
      dataIndex: "input",
      key: "input",
      render: (text) => text + " USD",
      sorter: (a, b) => a.input - b.input,
    },
    {
      title: "Output (USD)",
      dataIndex: "output",
      key: "output",
      render: (text) => text + " USD",
      sorter: (a, b) => a.output - b.output,
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

  console.log("loading account table, props ", props);
  const data = [];
  if (!_.isEmpty(props.accounts)) {
    for (const acct of props.accounts) {
      data.push({
        key: acct.id,
        transactionId: acct.id,
        risk: riskColor(acct.risk, acct.risk),
        address: acct.address,
        riskTriggered: riskTriggeredColor(acct.riskTriggered),
        asset: acct.asset,
        input: acct.input,
        output: acct.output,
        customer: acct.customer,
        date: acct.screenedTime,
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
  console.log(state);
  return {
    currentAcct: state.accounts.currentAcct,
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(WalletSummaryTable);
