import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchAccount } from "../../store/actions/AccountActions";
import WalletDetailsTable from "./WalletDetailsTable";
import WalletNavbar from "./WalletNavbar";

function WalletDetails(props) {
  const graph_url = "http://localhost:3001/accounts/";
  let { account_id } = useParams();
  const local_state = React.useState();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigate = useNavigate();

  const onSearch = (value) => {
    console.log("on search nav to ", value);
    props.fetchAccount(value, graph_url);
    navigate("/" + value);
  };

  React.useEffect(() => {
    if (
      !props.accounts ||
      props.accounts.length == 0 ||
      !props.currentAcct || 
      props.currentAcct.id != account_id
    ) {
      console.log("WalletDetails fetching account_id :", account_id);
      props.fetchAccount(account_id, graph_url, props);
    }
  }, []);

  const curAcct = props.currentAcct;
  console.log(
    "loading WalletDetails account_id",
    account_id,
    " props ",
    props,
    " current account ",
    curAcct
  );

  return (
    <Layout>
      <WalletNavbar />
      <Content
        style={{ padding: "2rem 5rem", minHeight: "calc(100vh - 64px)" }}
      >
        <WalletDetailsTable />
      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    currentAcct: state.accounts.currentAcct,
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccount: (account, graph_url) =>
      dispatch(fetchAccount(account, graph_url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
