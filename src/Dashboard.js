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
import thunk from "redux-thunk";

var jsonQuery = require("json-query");

const middlewares = [thunk]; 

const graph_url = 'http://localhost:9000/query/haijin_eth_test/address_txn_1hop?from_addr=0x0c46c5be97272dacd58574949cbb8921ce0c5a39';
const { Content } = Layout;

function createUseMiddlewareReducer(middlewares) {
  return (reducer, initState, initializer = s => s) => {
    const [state, setState] = React.useState(initializer(initState));
    const stateRef = React.useRef(state); // stores most recent state
    const dispatch = React.useMemo(
      () =>
        enhanceDispatch({
          getState: () => stateRef.current, // access most recent state
          stateDispatch: action => {
            stateRef.current = reducer(stateRef.current, action); // makes getState() possible
            setState(stateRef.current); // trigger re-render
            return action;
          }
        })(...middlewares),
      [middlewares, reducer]
    );
    return [state, dispatch];
  }
}
// |  dispatch fn  |
// A middleware has type (dispatch, getState) => nextMw => action => action
function enhanceDispatch({ getState, stateDispatch }) {
  return (...middlewares) => {
    let dispatch;
    const middlewareAPI = {
      getState,
      dispatch: action => dispatch(action)
    };
    dispatch = middlewares
      .map(m => m(middlewareAPI))
      .reduceRight((next, mw) => mw(next), stateDispatch);
    return dispatch;
  };
}
const useMiddlewareReducer = createUseMiddlewareReducer(middlewares); //init Hook

const account_reducer = (state, { type, account }) => {
  console.log("account_reducer :", state, type, account);
  if (type === "loading") return { status: "loading", ...state };
  if (type === "finished") return { status: "finished", data: account };
  return state;
};

function fetch_account(account) {
  return (dispatch, getState) => {
    fetch(graph_url, {mode: 'no-cors'})
      .then(
        (result) => {
          console.log("graph ajax request:", account, " result: ", result, " getState:", getState());
          let accounts = getState().accounts;
          accounts.push({
            id: account,
            owner: "usdcoin",
            ownerId: "1",
            type: "services",
            country: "US",
            risk: 2,
            currentBalance: 567.00,
            received: 567.00, 
            receivedTransactions: 567890,
            sent: 2,
            sentTransactions: 2,
          });
          dispatch({
            type: "loading",
            accounts: accounts
          });
        },
        (error) => {
          console.log(" error ", error);
        },
      );
  }
}

// https://www.twilio.com/blog/react-choose-functional-components
function Dashboard(props) {
  let { id } = useParams();
  // TODO(haijin): do we send ajax request onload ?
  let query = "accounts[id=" + id + "]";
  let account = jsonQuery(query, {
    data: props,
  }).value;
  console.log("loading dashboard ", query, " props ", props);

  const navigate = useNavigate();
  const [state, dispatch] = useMiddlewareReducer(account_reducer, 
    /*initState=*/{status: "idle", accounts: props.accounts});

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => {
    console.log("on search nav to ", value);
    dispatch(fetch_account(value));
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
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(Dashboard);
