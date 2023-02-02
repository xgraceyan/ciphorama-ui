import {
  Badge,
  Button,
  Col,
  Divider,
  Layout,
  Row,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { CopyOutlined } from "@ant-design/icons";
import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchAccount } from "../../store/actions/AccountActions";
import Sidebar from "../Sidebar";
import WalletDetailsTable from "./WalletDetailsTable";
import WalletNavbar from "./WalletNavbar";
import moment from "moment";
import WalletScanTable from "./WalletScanTable";
import WalletGraphView from "./WalletGraphView";
import _ from "underscore";

function WalletDetails(props) {
  let { account_id } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  const onSearch = (wallet) => {
    console.log("on search nav to ", wallet);
    props.fetchAccount(wallet);
    navigate("/" + wallet);
  };

  React.useEffect(() => {
    if (!props.currentAcct || props.currentAcct.id != account_id) {
      console.log("WalletDetails fetching account_id :", account_id);
      props.fetchAccount(account_id);
    }
  }, []);

  const curAcct = props.currentAcct;
  console.log(
    "Rendering WalletDetails account_id",
    account_id,
    " props ",
    props,
    " current account "
  );

  const copyAddress = () => {
    navigator.clipboard.writeText(props.currentAcct.id);
  };

  const riskBadgeColor = (risk) => {
    if (risk == "High") return "red";
    if (risk == "Medium") return "gold";
    if (risk == "Low") return "green";
  };

  return (
    <Layout>
      <Content>
        <WalletNavbar />

        <div style={{ padding: "2rem 3rem", minHeight: "calc(100vh - 64px)" }}>
          {props.currentAcct != null ? (
            <Row align="middle" justify="space-between" gutter={32}>
              <Col
                span={24}
                style={{
                  borderRadius: "20px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <h1 style={{ fontSize: "1.8rem" }}>
                  <span>Wallet Address: {props.currentAcct.id}</span>
                  &nbsp;
                  <span>
                    <Tooltip
                      placement="top"
                      title={"Copied to clipboard!"}
                      trigger="click"
                      mouseLeaveDelay={1}
                    >
                      <Button
                        type="text"
                        style={{
                          fontSize: "1rem",
                          color: "GrayText",
                        }}
                        icon={<CopyOutlined />}
                        onClick={copyAddress}
                      ></Button>
                    </Tooltip>
                  </span>
                </h1>
                <h2>
                  Risk Indicator: &nbsp; &nbsp;
                  <Tag
                    color={riskBadgeColor(props.currentAcct.risk)}
                    style={{ transform: "scale(1.4)" }}
                  >
                    {props.currentAcct.risk}
                  </Tag>
                </h2>
              </Col>
              <Col span={11} className="wallet-details-col">
                <h3>Overview</h3>
                <Table
                  rowClassName="tableRow"
                  style={{ padding: "0.5rem" }}
                  columns={[
                    {
                      dataIndex: "name",
                    },
                    {
                      dataIndex: "eth",
                      render: (text) => text + " ETH",
                    },
                    {
                      dataIndex: "usd",
                      render: (text) => text + " USD",
                    },
                  ]}
                  dataSource={[
                    {
                      key: "1",
                      name: "Balance:",
                      eth: props.currentAcct.currentBalance,
                      usd: 26156652.03,
                    },
                    {
                      key: "2",
                      name: "Total Received:",
                      eth: props.currentAcct.received,
                      usd: 2348327.39,
                    },
                    {
                      key: "3",
                      name: "Total Spent: ",
                      eth: props.currentAcct.sent,
                      usd: 2344.594,
                    },
                  ]}
                  size="middle"
                  pagination={false}
                />
              </Col>
              <Col span={11} className="wallet-details-col">
                <h3>More Info</h3>
                <Table
                  rowClassName="tableRow"
                  columns={[
                    {
                      dataIndex: "1",
                    },
                    {
                      dataIndex: "2",
                    },
                    {
                      dataIndex: "3",
                    },
                    {
                      dataIndex: "4",
                    },
                  ]}
                  dataSource={[
                    {
                      key: "1",
                      1: "Customer:",
                      2: props.currentAcct.customer,
                    },
                    {
                      key: "2",
                      1: "Wallet Creation Time:",
                      2: props.currentAcct.createdAt, //moment.unix(props.currentAcct.createdAt).format("YYYY-MM-DD hh:mm:ss"),
                      3: "Last Activity Time:",
                      4: props.currentAcct.lastActivityTime,
                    },
                    {
                      key: "3",
                      1: "Last Screened Time: ",
                      2: props.currentAcct.lastScreenedTime,
                      3: "Last Screened By: ",
                      4: props.currentAcct.lastScreenedBy,
                    },
                  ]}
                  size="middle"
                  pagination={false}
                />
              </Col>
            </Row>
          ) : (
            <h1>Invalid ID</h1>
          )}
          <Divider />
          <Tabs
            onChange={() => {}}
            type="card"
            className="wallet-details-tabs"
            items={[
              {
                key: "1",
                label: "Risk Rule Triggered",
                children: <WalletDetailsTable />,
              },
              {
                key: "2",
                label: "Graph View",
                children: <WalletGraphView />,
              },
              {
                key: "3",
                label: "Volume",
                children: "Volume",
              },
              {
                key: "4",
                label: "Scanning History",
                children: <WalletScanTable />,
              },
            ]}
            tabBarGutter={10}
          />
        </div>
      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
