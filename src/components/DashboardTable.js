import { Table, Tag, Space } from "antd";

const DashboardTable = () => {
  const columns = [
    {
      title: "Risk",
      dataIndex: "risk",
      key: "risk",
    },
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
      ],
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "From",
      dataIndex: "fromId",
      key: "fromId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "To",
      dataIndex: "toId",
      key: "toId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Geo",
      dataIndex: "geo",
      key: "geo",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ["topRight"] }}
    />
  );
};

export default DashboardTable;
