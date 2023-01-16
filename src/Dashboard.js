import React from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
import AccountDetails from "./components/AccountDetails";
import Sidebar from "./components/Sidebar";
import Search from "antd/es/input/Search";
import thunk from "redux-thunk";

var jsonQuery = require("json-query");

const middlewares = [thunk]; 

//const graph_url = 'http://localhost:9000/query/haijin_eth_test/address_txn_1hop?from_addr=0x0c46c5be97272dacd58574949cbb8921ce0c5a39';
const graph_url = 'http://localhost:3001/accounts/';
const { Content } = Layout;

function createUseMiddlewareReducer(middlewares) {
  return (reducer, initState, initializer = s => s) => {
    const [state, setState] = React.useState(initializer(initState));
    const stateRef = React.useRef(state); // stores most recent state
    const dispatch = React.useMemo(
      () =>
        enhanceDispatch({
          getState: () => stateRef.current, // access most recent state
          stateDispatch: action => {
            stateRef.current = reducer(stateRef.current, action); // makes getState() possible
            setState(stateRef.current); // trigger re-render
            return action;
          }
        })(...middlewares),
      [middlewares, reducer]
    );
    return [state, dispatch];
  }
}
// A middleware has type (dispatch, getState) => nextMw => action => action
function enhanceDispatch({ getState, stateDispatch }) {
  return (...middlewares) => {
    let dispatch;
    const middlewareAPI = {
      getState,
      dispatch: action => dispatch(action)
    };
    dispatch = middlewares
      .map(m => m(middlewareAPI))
      .reduceRight((next, mw) => mw(next), stateDispatch);
    return dispatch;
  };
}
const useMiddlewareReducer = createUseMiddlewareReducer(middlewares); //init Hook

const account_reducer = (state, { type, accounts }) => {
  console.log("account_reducer :", state, type, accounts);
  // if (type === "loading") return { status: "loading", ...state };
  // if (type === "finished") return { status: "finished", accounts };
  return state;
};

function fetch_account(account) {
  const accounts_url = graph_url + '/' + account;
  return (dispatch, getState) => {
    fetch(accounts_url, {method: 'GET'})
      .then(response => response.json())
      .then(
        (acct) => {
          console.log("graph ajax request:", accounts_url, " acct: ", acct, " getState:", getState());
          let accounts = getState().accounts;
          let idx = accounts.findIndex(a => a.id == acct.id);
          if (idx > -1) { accounts.splice(idx, 1, acct);} 
          else { accounts.push(acct);}
          dispatch({
            type: "finished",
            accounts: accounts
          });
        },
        (error) => {
          console.log("result error ", error);
        },
      ).catch(console.log);
  }
}

// https://www.twilio.com/blog/react-choose-functional-components
function Dashboard(props) {
  let { account_id } = useParams();
  let query = "accounts[id=" + account_id + "]";
  let account = jsonQuery(query, {
    data: props,
  }).value;
  console.log("loading dashboard ", query, " props ", props);

  const navigate = useNavigate();
  const [state, dispatch] = useMiddlewareReducer(account_reducer, 
    /*initState=*/{status: "idle", accounts: props.accounts});

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => {
    console.log("on search nav to ", value);
    dispatch(fetch_account(value));
    navigate("/" + value);
  };

  const local_state = React.useState();

  React.useEffect(() => {
    console.log("Dashboard Mounted");
  }, []);

  return (
    <Layout>
      <Layout>
        <Sidebar />
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
              <Search
                placeholder="Lookup address"
                onSearch={onSearch}
                enterButton
                style={{ width: "75%" }}
              />
            </section>

            <Divider />
            <AccountDetails key={props.accounts} account_id={account_id}/>

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

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(Dashboard);
