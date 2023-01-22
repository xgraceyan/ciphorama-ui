import React from "react";
import { Layout, Menu } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import {
  DashboardOutlined,
  WarningOutlined,
  BulbOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ backgroundColor: "#112545" }}
    >
      <div
        className="logo"
        style={{
          padding: "1rem",
        }}
      >
        <Link to="/">
          <Title
            style={{
              fontSize: "2rem",
              margin: "2rem 0",
              color: "white",
              textAlign: "center",
            }}
          >
            Ciphorama
          </Title>
        </Link>
        <Paragraph
          style={{
            color: "white",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          Ethereum Taint Tracing Welcome <strong>Haijin</strong>
        </Paragraph>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ backgroundColor: "#112545" }}
        defaultSelectedKeys={["0"]}
        items={[
          {
            label: "Dashboard",
            icon: <DashboardOutlined />,
            key: "0",
          },
          {
            label: "Risk Rules",
            icon: <WarningOutlined />,
            key: "1",
          },
          {
            label: "Wiki",
            icon: <BulbOutlined />,
            key: "2",
          },
          {
            label: "Settings",
            icon: <SettingOutlined />,
            key: "3",
            children: [
              {
                label: "My Account",
                key: "31",
              },
              {
                label: "Rule Configuration",
                key: "32",
              },
              {
                label: "Attribution",
                key: "33",
              },
            ],
          },
          {
            label: "Log Out",
            icon: <LogoutOutlined />,
            key: "4",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
