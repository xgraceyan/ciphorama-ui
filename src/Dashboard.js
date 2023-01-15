import React from "react";
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
import DashboardTable from "./components/DashboardTable";
const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
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
            }}
          >
            Ciphorama
          </Title>
          <Paragraph
            style={{
              color: "white",
              fontSize: "0.75rem",
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi,
            fugit.
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
      <Layout>
        <Content
          style={{
            margin: "0",
          }}
        >
          <div
            style={{
              padding: 30,
              background: colorBgContainer,
              minHeight: "100vh",
              overflow: "auto",
            }}
          >
            <section className="search-section">
              <Paragraph>ADDRESS: ETHEREUM (ETH)</Paragraph>
              <Input.Group compact>
                <Input
                  placeholder="Lookup address"
                  prefix={<SearchOutlined />}
                  style={{ width: "50%" }}
                />
                <Button>Search</Button>
              </Input.Group>
            </section>

            <Divider />

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
                      <h1
                        className="risk-card-text"
                        style={{ fontSize: "2rem" }}
                      >
                        9
                      </h1>
                    </Card>
                    <div>
                      <p>
                        <strong>OWNER</strong> &nbsp; USDCOIN
                      </p>
                      <p>
                        <strong>TYPE</strong> &nbsp; SERVICES
                      </p>
                      <p>
                        <strong>COUNTRY</strong> &nbsp; US
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
                          <b>149.234832 ETH</b>
                        </p>
                        <p>
                          <b>25,636,833</b> transactions
                        </p>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="stats-transactions-text">
                        <p>
                          <strong>RECEIVED</strong>
                        </p>
                        <p style={{ color: "#52c41a" }}>
                          <b>149.234832 ETH</b>
                        </p>
                        <p>
                          <b>25,636,833</b> transactions
                        </p>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="stats-transactions-text">
                        <p>
                          <strong>SENT</strong>
                        </p>
                        <p style={{ color: "#f5222d" }}>
                          <b>0.0000000 ETH</b>
                        </p>
                        <p>
                          <b>0</b> transactions
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

            <Divider />

            <section className="table-section">
              <DashboardTable />
            </section>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
