import React from "react";
import { Layout, Menu } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import {
  BranchesOutlined,
  FolderOpenOutlined,
  FileSearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        className="logo"
        style={{
          padding: "1rem",
        }}
      >
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
        <Paragraph
          style={{
            color: "white",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          Ethereum Taint Tracing
        </Paragraph>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={[
          {
            label: "Trace",
            icon: <BranchesOutlined />,
            key: "0",
          },
          {
            label: "Case Manager",
            icon: <FolderOpenOutlined />,
            key: "1",
          },
          {
            label: "Wiki",
            icon: <FileSearchOutlined />,
            key: "2",
          },
          {
            label: "Attribution",
            icon: <UnorderedListOutlined />,
            key: "3",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
