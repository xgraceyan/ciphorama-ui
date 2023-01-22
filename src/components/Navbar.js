import { Avatar, Layout, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Search from "antd/es/transfer/search";
import { SettingFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Header className="header nav-header">
      <div
        className="nav-right"
        style={{ float: "right", margin: "0px 24px 16px 0" }}
      >
        <Space>
          <div className="nav-search">
            <Search
              placeholder="Search for addresses, transactions, cases, and customers..."
              allowClear
              onSearch={() => {}}
              style={{
                width: 200,
              }}
            />
          </div>
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
        items={[
          {
            key: "1",
            label: <Link to="/wallet-summary">Wallets</Link>,
            title: <Link to="/wallet-summary">Wallets</Link>,
          },
          { key: "2", label: "Transactions" },
          { key: "3", label: "Forensics" },
          { key: "4", label: "Cases" },
          { key: "5", label: "Reports" },
          { key: "6", label: "KYB" },
        ]}
      />
    </Header>
  );
};

export default Navbar;
