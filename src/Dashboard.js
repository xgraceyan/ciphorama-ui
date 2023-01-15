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
import Sidebar from "./components/Sidebar";
import Search from "antd/es/input/Search";
const { Content } = Layout;

var jsonQuery = require("json-query");

const graph_url = 'http://localhost:9000/query/haijin_eth_test/address_txn_1hop?from_addr=0x0c46c5be97272dacd58574949cbb8921ce0c5a39';

// https://www.twilio.com/blog/react-choose-functional-components
function Dashboard(props) {
  let { id } = useParams();
  // TODO(haijin): do we send ajax request onload ?
  let query = "accounts[id=" + id + "]";
  let account = jsonQuery(query, {
    data: props,
  }).value;
  console.log("loading dashboard ", query, " account: ", account);

  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => {
    console.log("on search nav to ", value);
    fetch(graph_url, {mode: 'no-cors'})
      .then(
        (result) => {
          console.log("graph ajax result: ", result);
        }, 
        (error) => {
          console.log(" error ", error);
        },
      );
    navigate("/" + value);
  };

  const local_state = React.useState();

  React.useEffect(() => {
    console.log("Dashboard Mounted");
  }, []);

  if (account) {
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

              <section className="stats-section">
                <Row gutter={[8, 8]}>
                  <Col flex={3} className="stats-col">
                    <Space>
                      <Card
                        className="risk-card"
                        size="small"
                        style={{ backgroundColor: "#ff4d4f", color: "white" }}
                      >
                        <p className="risk-card-text">RISK</p>
                        <h1
                          className="risk-card-text"
                          style={{ fontSize: "2rem" }}
                        >
                          {account.risk}
                        </h1>
                      </Card>
                      <div>
                        <p>
                          <strong>OWNER</strong> &nbsp;{" "}
                          {account.owner.toUpperCase()}
                        </p>
                        <p>
                          <strong>TYPE</strong> &nbsp;{" "}
                          {account.type.toUpperCase()}
                        </p>
                        <p>
                          <strong>COUNTRY</strong> &nbsp; {account.country}
                        </p>
                      </div>
                    </Space>
                  </Col>
                  <Col flex={3} className="stats-col">
                    <Row>
                      <Col span={8}>
                        <div className="stats-transactions-text">
                          <p>
                            <strong>TOTAL</strong>
                          </p>
                          <p>
                            <b>{account.currentBalance} ETH</b>
                          </p>
                          <p>
                            <b>
                              {account.receivedTransactions +
                                account.sentTransactions}
                            </b>{" "}
                            transactions
                          </p>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="stats-transactions-text">
                          <p>
                            <strong>RECEIVED</strong>
                          </p>
                          <p style={{ color: "#52c41a" }}>
                            <b>{account.received} ETH</b>
                          </p>
                          <p>
                            <b>{account.receivedTransactions}</b> transactions
                          </p>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="stats-transactions-text">
                          <p>
                            <strong>SENT</strong>
                          </p>
                          <p style={{ color: "#f5222d" }}>
                            <b>{account.sent} ETH</b>
                          </p>
                          <p>
                            <b>{account.sentTransactions}</b> transactions
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col flex={2} className="stats-col">
                    <div className="stats-cases">
                      <Space>
                        <Tabs
                          items={[
                            {
                              key: "0",
                              label: "MY CASES",
                              children: "Not in cases you own",
                            },
                            {
                              key: "1",
                              label: "SHARED CASES",
                              children: "Not in cases shared with you",
                            },
                          ]}
                        />
                      </Space>
                    </div>
                  </Col>
                </Row>
              </section>

              <Divider />

              <section className="table-section">
                <DashboardTable />
              </section>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  } else {
    return <h1>Error: No account found</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.account,
  };
};

export default connect(mapStateToProps)(Dashboard);
