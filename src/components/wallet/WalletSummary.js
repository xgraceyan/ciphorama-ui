import { Button, Col, Divider, Layout, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  FilterFilled,
  ScanOutlined,
  UploadOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import React from "react";
import WalletSummaryTable from "./WalletSummaryTable";
import WalletNavbar from "./WalletNavbar";
import {
  fetchAccounts,
  fetchAccount,
} from "../../store/actions/AccountActions";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Search from "antd/es/input/Search";

function WalletSummary(props) {
  const graph_url = "http://localhost:3001/accounts/";
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  const onSearch = (value) => {
    console.log("on search nav to ", value);
    props.fetchAccount(value, graph_url);
    navigate("/wallet-details/" + value);
  };

  React.useEffect(() => {
    if (!props.accounts || props.accounts.length == 0) {
      props.fetchAccounts(graph_url, props);
    }
  }, []);

  const curAcct = props.currentAcct;
  console.log(
    "loading dashboard account_id",
    " props ",
    props,
    " current account ",
    curAcct
  );
  return (
    <Layout>
      <Sidebar />

      <Content>
        <WalletNavbar activeKey={1} />
        <div style={{ padding: "2rem 3rem", minHeight: "calc(100vh - 64px)" }}>
          <section className="search-section">
            <p style={{ fontSize: "1rem" }}>Search wallet address</p>
            <Search
              placeholder="Lookup address"
              onSearch={onSearch}
              enterButton
              style={{ width: "75%" }}
            />
          </section>
          <Divider />
          <Row justify="space-around" align="middle">
            <Col span={12} align="left" className="wallet-summary-title">
              <p style={{ fontSize: "1.5rem" }}>Wallets Screened</p>
            </Col>
            <Col span={12} align="right">
              <Button
                type="text"
                style={{
                  fontSize: "1rem",
                }}
                icon={<FilterFilled />}
              >
                Filter
              </Button>
              <Button
                type="text"
                style={{
                  fontSize: "1rem",
                }}
                icon={<ScanOutlined />}
              >
                Screen Wallet
              </Button>
              <Button
                type="text"
                style={{
                  fontSize: "1rem",
                }}
                icon={<UploadOutlined />}
              >
                Upload a File
              </Button>
              <Button
                type="text"
                style={{
                  fontSize: "1rem",
                }}
                icon={<ExportOutlined />}
              >
                Export Wallet
              </Button>
            </Col>
          </Row>
          <Divider />
          <WalletSummaryTable />
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
    fetchAccounts: (graph_url) => dispatch(fetchAccounts(graph_url)),
    fetchAccount: (account, graph_url) =>
      dispatch(fetchAccount(account, graph_url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletSummary);
