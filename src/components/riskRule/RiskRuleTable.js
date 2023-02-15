import React from "react";
import { Button, Col, Divider, Layout, Row, Select, Table } from "antd";
import { FilterFilled, ExportOutlined } from "@ant-design/icons";
import _ from "underscore";
import { riskColorAlt } from "../Utils";

export const RiskRuleTable = () => {
  const RiskDropdown = ({ index }) => {
    return (
      <Select
        defaultValue="high"
        style={{
          width: 120,
        }}
        onChange={(e) => {
          data[index].risk = e;
        }}
        options={[
          {
            value: "critical",
            label: riskColorAlt("Critical", "Critical"),
          },
          {
            value: "high",
            label: riskColorAlt("High", "High"),
          },
          {
            value: "medium",
            label: riskColorAlt("Medium", "Medium"),
          },
          {
            value: "low",
            label: riskColorAlt("Low", "Low"),
          },
        ]}
      />
    );
  };

  const EnabledDropdown = ({ index }) => {
    return (
      <Select
        defaultValue={true}
        style={{
          width: 120,
        }}
        onChange={(e) => {
          data[index].enabled = e;
        }}
        options={[
          {
            value: true,
            label: "On",
          },
          {
            value: false,
            label: "Off",
          },
        ]}
      />
    );
  };

  const data = [];
  const riskRules = [
    {
      id: 1,
      ruleName: "Sanction Human Trafficking",
      action: "Send to Case Management",
    },
    {
      id: 2,
      ruleName: "Hacks",
      action: "None",
    },
    {
      id: 3,
      ruleName: "Ponzi Scheme",
      action: "None",
    },
  ];
  const columns = [
    {
      title: "Rule Name",
      dataIndex: "ruleName",
      key: "ruleName",
      filters: [],
      filterSearch: true,
      onFilter: (value, record) => record.ruleName.startsWith(value),
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
      filters: [
        {
          text: "Direct",
          value: "direct",
        },
        {
          text: "Indirect",
          value: "indirect",
        },
      ],
      onFilter: (value, record) =>
        record.relationship.toLowerCase().startsWith(value),
    },
    {
      title: "Risk Indicator",
      dataIndex: "riskIndicator",
      key: "riskIndicator",
      filters: [
        {
          text: "Critical",
          value: "critical",
        },
        {
          text: "High",
          value: "high",
        },
        {
          text: "Medium",
          value: "medium",
        },
        {
          text: "Low",
          value: "low",
        },
      ],
      onFilter: (value, record) => record.risk.startsWith(value),
    },
    {
      title: "Enabled",
      dataIndex: "enabledIndicator",
      key: "enabledIndicator",
      filters: [
        {
          text: "On",
          value: true,
        },
        {
          text: "Off",
          value: false,
        },
      ],
      onFilter: (value, record) => record.enabled == value,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  if (!_.isEmpty(riskRules)) {
    var i = 0;
    for (const rule of riskRules) {
      data.push({
        index: i,
        key: rule.id + "direct",
        ruleName: rule.ruleName,
        relationship: "Direct",
        action: rule.action,
        riskIndicator: <RiskDropdown index={i} />,
        risk: "medium",
        enabledIndicator: <EnabledDropdown index={i} />,
        enabled: true,
      });
      data.push({
        index: i++,
        key: rule.id + "indirect",
        ruleName: rule.ruleName,
        relationship: "Indirect",
        action: rule.action,
        riskIndicator: <RiskDropdown index={i++} />,
        risk: "medium",
        enabledIndicator: <EnabledDropdown index={i++} />,
        enabled: true,
      });
      columns[0].filters.push({
        text: rule.ruleName,
        value: rule.ruleName,
      });
      i += 2;
    }
  }

  console.log(data);

  return (
    <div style={{ padding: "0 2rem" }}>
      <Row justify="space-around" align="middle">
        <Col span={12} align="left"></Col>
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
            icon={<ExportOutlined />}
          >
            Export Rule
          </Button>
        </Col>
      </Row>
      <Divider />
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) =>
            record.relationship == "Direct" ? (
              <p>
                The targeted wallet or the counterparty wallet is{" "}
                <strong>directly</strong> involved in{" "}
                <strong>{record.ruleName}</strong>
              </p>
            ) : (
              <p>
                The targeted wallet or the counterparty wallet is{" "}
                <strong>indirectly</strong> exposed to{" "}
                <strong>{record.ruleName}</strong>
              </p>
            ),
        }}
        pagination={{ position: ["bottomRight"] }}
      />
    </div>
  );
}

export default RiskRuleTable;
