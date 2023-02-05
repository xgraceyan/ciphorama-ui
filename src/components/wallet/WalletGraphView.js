import React from "react";
import { connect } from "react-redux";
import { useNavigate, redirect, useHistory } from "react-router-dom";
import G6 from "@antv/g6";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import _ from "underscore";
import moment from "moment";
import {
  riskBadgeColor,
  riskScoreColor,
  riskTriggeredColor,
  shortenAddress,
} from "./Utils";
var ReactDOM = require("react-dom");

function WalletGraphView(props) {
  const ref = React.useRef(null);
  const [graph, setGraph] = useState(null);
  var width = 1500;
  var height = 0;

  const data = {
    // The array of nodes
    nodes: [],
    // The array of edges
    edges: [],
  };

  console.log("txnDATA>>>", props.currentWallet.transactions);

  // const txnData = props.currentWallet.transactions;
  const txnData = [
    {
      id: "0xacb4c9c7ec4fbccacffd4d32303d963cac4b4a58c97246540861216d05682f71",
      fromAddress: "0x04786aada9deea2150deab7b3b8911c309f5ed90",
      toAddress: "0x1eb01694e69d01cd2a5efe2ca7998a8b707dfcec",
      risk: "High",
      riskScore: 0,
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      volume: 150,
      activityTime: "2019-02-20T02:36:32Z",
    },
    {
      id: "0x8012017ff87d491e16a16742304801da1672eeabe779122ed2ced8165ca198b9",
      fromAddress: "0x04786aada9deea2150deab7b3b8911c309f5ed90",
      toAddress: "0x0c6646c18481d55c4f993f5a029c6b5144259cba",
      risk: "High",
      riskScore: 0,
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      volume: 43,
      activityTime: "2019-04-16T03:38:20Z",
    },
    {
      id: "0x0abfd8a7051bc5a2e4c3261a651045aee6abb6074f13a7650a37d593daedfc86",
      fromAddress: "0x04786aada9deea2150deab7b3b8911c309f5ed90",
      toAddress: "0x542e843da19b3894b46f59700245eb4cef53626e",
      risk: "High",
      riskScore: 0,
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      volume: 1,
      activityTime: "2017-02-25T05:04:03Z",
    },
    {
      id: "0xa7e764a5f1dc437af57c9ee93b2aad79007e1e121c6db284d8c0022d65d89432",
      fromAddress: "0x04786aada9deea2150deab7b3b8911c309f5ed90",
      toAddress: "0x1ffd84bf9ffc34122402f2e90f56a2d9b45686f0",
      risk: "High",
      riskScore: 0,
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      volume: 1,
      activityTime: "2017-02-21T21:54:10Z",
    },
    {
      id: "0x809c745432694ba63fdeb32825ef3c6bdf532f47355f90d6df74410e6cf06af5",
      fromAddress: "0x1eb01694e69d01cd2a5efe2ca7998a8b707dfcec",
      toAddress: "0x0c6646c18481d55c4f993f5a029c6b5144259cbd",
      risk: "High",
      riskScore: 0,
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      volume: 25,
      activityTime: "2017-02-20T22:07:49Z",
    },
    {
      id: "0x01df47300ba3ba2553520b73d01c39d016af423e6bd434b2e92174cd62082685",
      fromAddress: "0x0c6646c18481d55c4f993f5a029c6b5144259cba",
      toAddress: "0x542e843da19b3894b46f59700245eb4cef53626c",
      risk: "High",
      riskScore: 0,
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      volume: 5000,
      activityTime: "2016-05-12T08:23:32Z",
    },
    {
      id: "0x8967bb1414c8f3466371f71aa518fd9eecc199b6acd5c652c0e0acd5bab0ad93",
      fromAddress: "0x542e843da19b3894b46f59700245eb4cef53626e",
      toAddress: "0x1ffd84bf9ffc34122402f2e90f56a2d9b45686f1",
      risk: "High",
      riskScore: 0,
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      volume: 2000,
      activityTime: "2016-05-12T08:54:40Z",
    },
  ];
  

  console.log("rendering graph view props: ", props);
  useEffect(() => {
    console.log(graph);
    if (!graph) {
      setGraph(
        new G6.Graph({
          container: ReactDOM.findDOMNode(ref.current),
          width,
          height,
          defaultNode: {
            shape: "node",
            size: 75,
            labelCfg: {
              style: {
                fontSize: 10,
              },
            },
            style: {
              stroke: "#B4B4B4",
              width: 150,
            },
          },
          defaultEdge: {
            shape: "polyline",
            style: {
              endArrow: true,
              lineWidth: 3,
            },
          },
          modes: {
            default: [
              {
                type: "tooltip", // Tooltip
                formatText(model) {
                  // The content of tooltip
                  const text =
                    "<strong>Transaction ID</strong>: " +
                    model.data.id +
                    "<br/> <strong>Risk</strong>: " +
                    model.data.riskTriggered +
                    " [" +
                    model.data.risk +
                    "]" +
                    "<br/> <strong>Counter Address</strong>: " +
                    model.data.counterAddress +
                    " " +
                    model.data.counterEntity +
                    "<br/> <strong>Volume</strong>: " +
                    model.data.volume +
                    " " +
                    model.data.assetType +
                    "<br/> <strong>Customer</strong>: " +
                    model.data.customer +
                    "<br/> <strong>Activity Time</strong>: " +
                    model.data.activityTime;
                  // moment.unix(model.data.activityTime).format("YYYY-MM-DD hh:mm:ss");
                  return text;
                },
              },
            ],
          },
        })
      );
    }
  }, []);

  // replace txnData with props.currentWallet.transactions
  if (!_.isEmpty(props.currentWallet)) {
    height = txnData.length * 100;
    const yCoordGap = height / txnData.length;
    var yCoord = yCoordGap;
    var yCoord2 = yCoordGap;

    var txnArr = [];

    data.nodes.push({
      id: "sourceNode", // String, unique and required
      label:
        shortenAddress(props.currentWallet.id) +
        "\n" +
        props.currentWallet.currentBalance +
        " " +
        props.currentWallet.assetType, // The label of the node
      x: 0,
      y: height / 2,
      size: 120,
      labelCfg: {
        style: {
          fontSize: 15,
        },
      },
    });

    for (const txn of txnData) {
      height += 100;
      if (txn.fromAddress == props.currentWallet.id) {
        data.nodes.push({
          id: txn.toAddress,
          x: width / 3,
          y: yCoord,
          label:
            shortenAddress(txn.toAddress) +
            "\n" +
            txn.volume +
            " " +
            txn.assetType,
          data: txn,
        });

        if (txn.direction == "Inbound") {
          data.edges.push({
            source: txn.toAddress,
            target: "sourceNode",
            label: shortenAddress(txn.id) + "\n" + txn.activityTime,
            // moment.unix(txn.activityTime).format("YYYY-MM-DD hh:mm:ss"),
          });
        } else {
          data.edges.push({
            source: "sourceNode",
            target: txn.toAddress,
            label: shortenAddress(txn.id) + "\n" + txn.activityTime,
            // moment.unix(txn.activityTime).format("YYYY-MM-DD hh:mm:ss"),
          });
        }

        yCoord += yCoordGap;
      } else {
        txnArr.push(txn);
      }
    }
    for (const txn of txnArr) {
      data.nodes.push({
        id: txn.toAddress,
        x: (width * 2) / 3,
        y: yCoord2,
        label:
          shortenAddress(txn.toAddress) +
          "\n" +
          txn.volume +
          " " +
          txn.assetType,
        data: txn,
      });
      data.edges.push({
        source: txn.fromAddress,
        target: txn.toAddress,
        label: shortenAddress(txn.id) + "\n" + txn.activityTime,
        // moment.unix(txn.activityTime).format("YYYY-MM-DD hh:mm:ss"),
      });
      yCoord2 += yCoordGap;
    }
  }

  if (graph) {
    graph.data(data);
    graph.changeSize(width, txnData.length * 100);
    graph.render();
    graph.fitCenter();

    graph.on("node:click", (event) => {
      window.location.replace(
        "/wallet-details/" + event.item._cfg.model.data.counterAddress
      );
    });
  }

  return <div ref={ref} style={{ width: "100%", textAlign: "center" }}></div>;
}

const mapStateToProps = (state) => {
  return {
    currentWallet: state.wallets.currentWallet,
    wallets: state.wallets.wallets,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(WalletGraphView);
