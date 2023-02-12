import _ from "underscore";
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
import { fetchWallet } from "../../store/actions/AccountActions";
import Sidebar from "../Sidebar";
import WalletDetailsTable from "./WalletDetailsTable";
import WalletNavbar from "./WalletNavbar";
import moment from "moment";
import WalletScanTable from "./WalletScanTable";
import WalletGraphView from "./WalletGraphView";
import { 
  riskBadgeColor, 
  riskTriggeredColor, 
  shortenAddress,
  convertToPrecision, 
  formatDate,
  styledField
} from "../Utils";
import { USDPrecision, CryptoPrecision } from "../../Constants";

function WalletDetails(props) {
  let { wallet_addr } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      _.isEmpty(props.currentWallet) ||
      props.currentWallet.id != wallet_addr
    ) {
      console.log("WalletDetails fetching wallet_addr :", wallet_addr);
      props.fetchWallet(wallet_addr);
    }
  }, []);

  console.log("CURRENT WALLET >>>", props.currentWallet);

  console.log("Rendering WalletDetails wallet ", useParams(), " wallet_addr ", wallet_addr, " props ", props);

  const copyAddress = () => {
    navigator.clipboard.writeText(props.currentWallet.id);
  };

  return (
    <Layout>
      <Content>
        <WalletNavbar />
        <div style={{ padding: "2rem 3rem", minHeight: "calc(100vh - 64px)" }}>
          {props.currentWallet != null ? (
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
                  <span>Wallet Address: {shortenAddress(props.currentWallet.id)}</span>
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
                    color={riskBadgeColor(props.currentWallet.risk)}
                    style={{ transform: "scale(1.4)" }}
                  >
                    {props.currentWallet.risk}
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
                      name: styledField("Balance:"),
                      eth: convertToPrecision(props.currentWallet.currentBalance, CryptoPrecision),
                      usd: convertToPrecision(props.currentWallet.ethPrice * props.currentWallet.currentBalance, USDPrecision),
                    },
                    {
                      key: "2",
                      name: styledField("Total Received:"),
                      eth: convertToPrecision(props.currentWallet.received, CryptoPrecision),
                      usd: convertToPrecision(props.currentWallet.ethPrice * props.currentWallet.received, USDPrecision),
                    },
                    {
                      key: "3",
                      name: styledField("Total Spent:"),
                      eth: convertToPrecision(props.currentWallet.sent, CryptoPrecision),
                      usd: convertToPrecision(props.currentWallet.ethPrice * props.currentWallet.sent, USDPrecision),
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
                      1: styledField("Customer:"),
                      2: props.currentWallet.customer,
                    },
                    {
                      key: "2",
                      1: styledField("Wallet Creation Time:"),
                      2: formatDate(props.currentWallet.createdAt), //moment.unix(props.currentWallet.createdAt).format("YYYY-MM-DD hh:mm:ss"),
                      3: styledField("Last Activity Time:"),
                      4: formatDate(props.currentWallet.lastActivityTime),
                    },
                    {
                      key: "3",
                      1: styledField("Last Screened Time:"),
                      2: formatDate(props.currentWallet.lastScreenedTime),
                      3: styledField("Last Screened By:"),
                      4: props.currentWallet.lastScreenedBy,
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
  return {
    currentWallet: state.wallets.currentWallet,
    wallets: state.wallets.wallets,
    transactions: state.transactions.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWallet: (wallet) => dispatch(fetchWallet(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
