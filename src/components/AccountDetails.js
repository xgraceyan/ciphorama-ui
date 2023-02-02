import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Menu, theme, Input, Row, Col, Divider, Space, Button, Card, Tabs } from "antd";
import _ from "underscore";

var jsonQuery = require("json-query");

// Deprecated !!! use WalletDetails
function AccountDetails({ props }) {
  console.log("AccountDetails props:", props);
  const account = props;  //props.currentAcct;
  if (!_.isEmpty(account)) {
    return (
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
                <h1 className="risk-card-text" style={{ fontSize: "2rem" }}>
                  {account.risk}
                </h1>
              </Card>
              <div>
                <p>
                  <strong>OWNER</strong> &nbsp; {account.owner.toUpperCase()}
                </p>
                <p>
                  <strong>TYPE</strong> &nbsp; {account.type.toUpperCase()}
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
                      {account.receivedTransactions + account.sentTransactions}
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
    );
  }
}

// map the entire redux store state to props.
const mapStateToProps = (state) => {
  return {  
    currentAcct: state.accounts.currentAcct,
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(AccountDetails);
