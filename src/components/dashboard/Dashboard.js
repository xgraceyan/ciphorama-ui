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
import Sidebar from "../Sidebar";
import Search from "antd/es/input/Search";
import thunk from "redux-thunk";
import { fetchDashboard } from "../../store/actions/AccountActions";
import { Header } from "antd/es/layout/layout";
import Navbar from "../Navbar";
import WalletRiskGraph from "./WalletRiskGraph";
import PieGraph from "./PieGraph";
import CasesTable from "./CasesTable";
import _ from "underscore";

var jsonQuery = require("json-query");

function Dashboard(props) {
  const { Content } = Layout;
  let { account_id } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(" fetching dashboard ", props);
    props.fetchDashboard();
  }, []);

  const mock_dashboard = {
    dashboardStats: {
      totalAddresses: 92,
      totalTransactions: 256226,
      totalOpenCase: 3,
    },
    riskSeverity: {
      abuse: 3,
      deployer: 20,
      exploiter: 6,
      fake: 13,
      gambling: 14,
      hacker: 40,
      phishing: 14,
      ransomware: 12,
      sanction: 26,
      scam: 19,
    },
    riskByCategory: {
      abuse: 1.79641,
      deployer: 11.97605,
      exploiter: 3.59281,
      fake: 7.78443,
      gambling: 8.38323,
      hacker: 23.9521,
      phishing: 8.38323,
      ransomware: 7.18563,
      sanction: 15.56886,
      scam: 11.37725,
    },
    walletByAssetTypes: {
      eth: 100,
    },
    caseManagement: [
      {
        name: "John Smith",
        caseAssigned: 4,
        caseClosed: 1,
        caseOpen: 3,
        lastActivity: "2023-02-15T01:31:55.302040992Z",
      },
    ],
  };
  
  const dashboardData = props.dashboard;
  
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
          <div
            className="content"
            style={{
              paddingTop: "1rem",
              paddingBottom: "2rem",
              margin: "0rem 5rem",
            }}
          >
            {!_.isEmpty(dashboardData) ? (
              <div>
                <section
                  style={{
                    padding: "1.5rem 0rem",
                    borderRadius: "25px",
                    border: "1px solid lightgrey",
                  }}
                >
                  <h1
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    Overview
                  </h1>
                  <Row style={{ textAlign: "center" }}>
                    <Col span={8}>
                      <h1 style={{ fontSize: 40, margin: 0 }}>
                        {dashboardData.dashboardStats.totalAddresses}
                      </h1>
                      <p style={{ marginBottom: 0 }}>Total Addresses</p>
                    </Col>
                    <Col span={8}>
                      <h1 style={{ fontSize: 40, margin: 0 }}>
                        {dashboardData.dashboardStats.totalTransactions}
                      </h1>
                      <p style={{ marginBottom: 0 }}>Total Transactions</p>
                    </Col>
                    <Col span={8}>
                      <h1 style={{ fontSize: 40, margin: 0 }}>
                        {dashboardData.dashboardStats.totalOpenCase}
                      </h1>
                      <p style={{ marginBottom: 0 }}>Total Open Cases</p>
                    </Col>
                  </Row>
                </section>
                <section>
                  <Row justify="space-between" style={{ marginTop: "1rem" }}>
                    <Col span={13} className="border-col">
                      <div>
                        <h1
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            margin: "0 0 1rem 0",
                          }}
                        >
                          Wallets Risk by Severity
                        </h1>
                        <WalletRiskGraph />
                        <a
                          href=""
                          style={{
                            position: "absolute",
                            bottom: 0,
                            marginBottom: "15px",
                          }}
                        >
                          View Report
                        </a>
                      </div>
                    </Col>
                    <Col span={10} className="border-col">
                      <div>
                        <h1
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            margin: "0 0 1rem 0",
                          }}
                        >
                          Top Risks by Category
                        </h1>
                        <PieGraph data={dashboardData.riskByCategory} />
                        <a
                          href=""
                          style={{
                            position: "absolute",
                            bottom: 0,
                            marginBottom: "15px",
                          }}
                        >
                          View Report
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <Row justify="space-between" style={{ marginTop: "1rem" }}>
                    <Col span={10} className="border-col">
                      <h1
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          margin: "0 0 1rem 0",
                        }}
                      >
                        Wallets by Asset Types
                      </h1>
                      <PieGraph data={dashboardData.walletByAssetTypes} />
                      <a
                        href=""
                        style={{
                          position: "absolute",
                          bottom: 0,
                          marginBottom: "15px",
                        }}
                      >
                        View Report
                      </a>
                    </Col>
                    <Col span={13} className="border-col">
                      <div>
                        <h1
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            margin: "0 0 1rem 0",
                          }}
                        >
                          Wallets by Asset Types
                        </h1>
                        <CasesTable data={dashboardData.caseManagement} />
                        <a
                          href=""
                          style={{
                            position: "absolute",
                            bottom: 0,
                            marginBottom: "15px",
                          }}
                        >
                          View Report
                        </a>
                      </div>
                    </Col>
                  </Row>
                </section>
              </div>
            ) : null}
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
    fetchDashboard: () => dispatch(fetchDashboard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
