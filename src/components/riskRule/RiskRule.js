import { Button, Col, Layout, Row, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import RiskRuleTable from "./RiskRuleTable";

export const RiskRule = () => {
  return (
    <Layout>
      <Sidebar pageIndex={1} />
      <Content
        style={{
          margin: "0",
        }}
        className="content"
      >
        <Navbar />
        <div className="content" style={{ padding: "2rem 3rem" }}>
          <Tabs
            type="card"
            className="wallet-details-tabs"
            items={[
              {
                key: "1",
                label: "Configurable Risk Rules",
                children: <RiskRuleTable />,
              },
              {
                key: "2",
                label: "Behavior-based Risk Rules",
                children: "Behavior-based Risk Rules",
              },
              {
                key: "3",
                label: "Machine Learning Risk Rules",
                children: "Machine Learning Risk Rules",
              },
              {
                key: "4",
                label: "Customize Risk Rules",
                children: "Customize Risk Rules",
              },
            ]}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default RiskRule;
