import { Avatar, Layout, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";

import { SettingFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { connect } from "react-redux";
import { fetchWallet } from "../../store/actions/AccountActions";
import Search from "antd/es/input/Search";

function WalletNavbar(props) {
  const navigate = useNavigate();

  const onSearch = (wallet) => {
    console.log("WalletNavbar :: onSearch ", wallet);
    // props.fetchWallet(wallet);
    navigate("/wallet-details/" + wallet);
  };

  return (
    <Header className="header nav-header">
      <div
        className="logo"
        style={{
          float: "left",
          margin: "-2px 24px 0px 0",
          overflow: "hidden",
        }}
      >
        <Link to="/" style={{ all: "unset", cursor: "pointer" }}>
          <h1 style={{ textAlign: "center", margin: 0 }}>Ciphorama</h1>
        </Link>
      </div>
      <div
        className="nav-right"
        style={{ float: "right", margin: "0px 24px 16px 0" }}
      >
        <Space direction="horizontal">
          <Search
            placeholder="Search for addresses, transactions, cases, and customers..."
            allowClear
            onSearch={onSearch}
            style={{ width: 300, verticalAlign: "middle" }}
            enterButton
          />
          <div>
            <a href="" className="icon-button">
              <SettingFilled
                style={{
                  fontSize: "1.5rem",
                  verticalAlign: "middle",
                  margin: "0 0 3px 16px",
                }}
              />
            </a>
            <Avatar
              style={{
                fontSize: "1.5rem",
                margin: "0 0 3px 16px",
              }}
              size="large"
            >
              H
            </Avatar>
          </div>
        </Space>
      </div>
      <Menu
        className="navbar"
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["0"]}
        items={[
          {
            key: "1",
            label: <Link to="/wallet-summary">Wallets</Link>,
            className: "wallet-nav-selected",
          },
        ]}
      />
    </Header>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWallet: (wallet) => dispatch(fetchWallet(wallet)),
  };
};

export default connect(mapDispatchToProps)(WalletNavbar);
