import React from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  BranchesOutlined,
  FolderOpenOutlined,
  FileSearchOutlined,
  UnorderedListOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Input,
  Row,
  Col,
  Divider,
  Space,
  Button,
  Card,
  Tabs,
} from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import DashboardTable from "./components/DashboardTable";
import AccountDetails from "./components/AccountDetails";
import Sidebar from "./components/Sidebar";
import Search from "antd/es/input/Search";
import thunk from "redux-thunk";
import { fetchAccount } from "./store/actions/AccountActions";
import { Header } from "antd/es/layout/layout";

var jsonQuery = require("json-query");

const middlewares = [thunk];

//const graph_url = 'http://localhost:9000/query/haijin_eth_test/address_txn_1hop?from_addr=0x0c46c5be97272dacd58574949cbb8921ce0c5a39';
const graph_url = "http://localhost:3001/accounts/";
const { Content } = Layout;

// https://www.twilio.com/blog/react-choose-functional-components
function Dashboard(props) {
  let { account_id } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  const onSearch = (value) => {
    console.log("on search nav to ", value);
    props.fetchAccount(value, graph_url);
    navigate("/" + value);
  };

  React.useEffect(() => {
    console.log("Dashboard Mounted with props: ", props);
    if (
      !props.accounts ||
      props.accounts.length == 0 ||
      !props.accounts[0].id == account_id
    ) {
      props.fetchAccount(account_id, graph_url, props);
    }
  }, []);

  const curAcct = props.currentAcct;
  console.log(
    "loading dashboard account_id",
    account_id,
    " props ",
    props,
    " current account ",
    curAcct
  );
  return (
    <Layout>
      <Layout>
        <Sidebar />
        <Content
          style={{
            margin: "0",
          }}
        >
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={[
                { key: "1", label: "Hi" },
                { key: "2", label: "Hello" },
              ]}
            />
          </Header>
          <div
            style={{
              padding: 30,
              minHeight: "100vh",
              overflow: "auto",
            }}
          >
            <section className="search-section">
              <Paragraph>ADDRESS: ETHEREUM (ETH)</Paragraph>
              <Search
                placeholder="Lookup address"
                onSearch={onSearch}
                enterButton
                style={{ width: "75%" }}
              />
            </section>

            <Divider />
            <AccountDetails account={curAcct} />

            <Divider />

            <section className="table-section">
              <DashboardTable />
            </section>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    currentAcct: state.accounts.currentAcct,
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccount: (account, graph_url) =>
      dispatch(fetchAccount(account, graph_url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
