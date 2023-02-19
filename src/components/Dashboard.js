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
import DashboardTable from "./DashboardTable";
import Sidebar from "./Sidebar";
import Search from "antd/es/input/Search";
import thunk from "redux-thunk";
import { fetchDashboard } from "../store/actions/AccountActions";
import { Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";

var jsonQuery = require("json-query");

function Dashboard(props) {
  const { Content } = Layout;
  let { account_id } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  const onSearch = (wallet_addr) => {
    const search_addr = wallet_addr + "&save=true"
    console.log("on search nav to ", search_addr);
    props.fetchWallet(search_addr);
    navigate("/wallet-details/" + search_addr);
  };

  React.useEffect(() => {
    props.fetchDashboard();
  }, []);

  const mock_dashboard = {
    "dashboardStats": {
      "totalAddresses": 92,
      "totalTransactions": 0,
      "totalOpenCase": 0
    },
    "riskSeverity": {
      "abuse": 3,
      "deployer": 20,
      "exploiter": 6,
      "fake": 13,
      "gambling": 14,
      "hacker": 40,
      "phishing": 14,
      "ransomware": 12,
      "sanction": 26,
      "scam": 19
    },
    "riskByCategory": {
      "abuse": 1.79641,
      "deployer": 11.97605,
      "exploiter": 3.59281,
      "fake": 7.78443,
      "gambling": 8.38323,
      "hacker": 23.9521,
      "phishing": 8.38323,
      "ransomware": 7.18563,
      "sanction": 15.56886,
      "scam": 11.37725
    },
    "walletByAssetTypes": {
      "eth": 100
    },
    "caseManagement": [
      {
        "name": "John Smith",
        "caseAssigned": 4,
        "caseClosed": 1,
        "caseOpen": 3,
        "lastActivity": "2023-02-15T01:31:55.302040992Z"
      }
    ]
  };

  console.log("rendering Dashboard props ", props);

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
    ...state.dashboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDashboard: () =>
      dispatch(fetchDashboard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
