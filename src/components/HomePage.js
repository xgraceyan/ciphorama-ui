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
import Sidebar from "./Sidebar";
import Search from "antd/es/input/Search";
import thunk from "redux-thunk";
import { Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { fetchWallet } from "../store/actions/AccountActions";

function HomePage(props) {
  let { account_id } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  const { Content } = Layout;

  const onSearch = (wallet_addr) => {
    const search_addr = wallet_addr + "&save=true";
    console.log("on search nav to ", search_addr);
    props.fetchWallet(search_addr);
    navigate("/wallet-details/" + search_addr);
  };

  return (
    <Layout>
      <Layout>
        <Sidebar pageIndex={-1} />
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
    fetchWallet: (wallet) => dispatch(fetchWallet(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
