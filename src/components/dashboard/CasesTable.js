import { Table } from "antd";
import React from "react";

function CasesTable(props) {
  const { data } = props;

  for (var i = 0; i < data.length; i++) {
    data[i]["key"] = i;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Case Assigned",
      dataIndex: "caseAssigned",
      key: "caseAssigned",
    },
    {
      title: "Case Closed",
      dataIndex: "caseClosed",
      key: "caseClosed",
    },
    {
      title: "Last Activity",
      dataIndex: "activity",
      key: "lastActivity",
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      rowClassName="tableRowAlt"
      style={{ margin: "0.5rem 0" }}
    />
  );
}

export default CasesTable;
