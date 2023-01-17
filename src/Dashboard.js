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

var jsonQuery = require("json-query");

const middlewares = [thunk];

//const graph_url = 'http://localhost:9000/query/haijin_eth_test/address_txn_1hop?from_addr=0x0c46c5be97272dacd58574949cbb8921ce0c5a39';
const graph_url = "http://localhost:3001/accounts/";
const { Content } = Layout;

// https://www.twilio.com/blog/react-choose-functional-components
function Dashboard(props) {
  let { account_id } = useParams();
  let query = "accounts[id=" + account_id + "]";
  console.log("loading dashboard ", query, " props ", props);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => {
    console.log("on search nav to ", value);
    props.fetchAccount(value, graph_url);
    navigate("/" + value);
  };

  const local_state = React.useState();

  React.useEffect(() => {
    console.log("Dashboard Mounted");
    if (props.accounts) {
      if (props.accounts.id == account_id) {
      } else props.fetchAccount(account_id, graph_url);
    } else props.fetchAccount(account_id, graph_url);
  }, []);

  let account = props.accounts;

  return (
    <Layout>
      <Layout>
        <Sidebar />
        <Content
          style={{
            margin: "0",
          }}
        >
          <div
            style={{
              padding: 30,
              background: colorBgContainer,
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
            <AccountDetails account={account} />

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
