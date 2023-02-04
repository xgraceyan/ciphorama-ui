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
import { fetchWallet } from "./store/actions/AccountActions";
import { Header } from "antd/es/layout/layout";
import Navbar from "./components/Navbar";

var jsonQuery = require("json-query");

const middlewares = [thunk];
const { Content } = Layout;

// https://www.twilio.com/blog/react-choose-functional-components
function Dashboard(props) {
  let { account_id } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  const onSearch = (wallet_addr) => {
    console.log("on search nav to ", wallet_addr);
    props.fetchWallet(wallet_addr);
    navigate("/wallet-details/" + wallet_addr);
  };

  return (
    <Layout>
      <Layout>
        <Sidebar pageIndex={0} />
        <Content
          style={{
            margin: "0",
          }}
          className="content"
        >
          <Navbar />
          <div className="dashboard-content content">
            <section className="search-section">
              <div className="search-section-element">
                <h1 style={{ fontSize: 30 }}>Search</h1>
              </div>
              <div className="search-section-element">
                <Search
                  placeholder="Search for addresses, transactions, cases and customers..."
                  onSearch={onSearch}
                  enterButton
                  style={{ width: "75%" }}
                  size="large"
                />
              </div>
            </section>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    currentWallet: state.wallets.currentWallet,
    wallets: state.wallets.wallets,
    transactions: state.transactions.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWallet: (wallet) =>
      dispatch(fetchWallet(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
