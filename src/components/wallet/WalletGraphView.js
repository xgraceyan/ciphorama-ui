import React from "react";
import { connect } from "react-redux";
import G6 from "@antv/g6";
import { useEffect } from "react";
import { useState } from "react";
import _ from "underscore";
import { shortenAddress, convertToPrecision } from "../Utils";
import { CryptoPrecision } from "../../Constants";

var ReactDOM = require("react-dom");

const CreateNode = (txn, x, y) => {
  console.log("Creating Node : ", shortenAddress(txn.toAddress));
  return {
    id: txn.toAddress,
    // x: x,
    // y: y,
    size: 80,
    label: shortenAddress(txn.toAddress), // + "\n" + txn.value + " " + txn.assetType,
    data: txn,
  }
}

const CreateEdge = (txn) => {
  var src, target;
  if (txn.direction == "Inbound") {
    src = txn.toAddress;
    target = txn.fromAddress;
  } else {
    src = txn.fromAddress;
    target = txn.toAddress;
  }
  return {
    type: "quadratic",
    source: src,
    target: target,
    label: shortenAddress(txn.id),
    data: txn,
    // moment.unix(txn.activityTime).format("YYYY-MM-DD hh:mm:ss"),
  }
}

function GetLayout(currentWallet) {
  // return {
  //   type: 'radial', // 'mindmap', // 'dendrogram', // 'indented', // , // Layout type
  //   focusNode: currentWallet.id,
  //   center: [600, 400],
  //   linkDistance: 600,
  //   nodeSize: 120,
  //   preventOverlap: true,
  //   // unitRadius: 100,
  //   nodeSpacing: 400,
  //   strictRadial: false,
  // }
  return {
    type: 'mds',
    center: [600, 400],
    linkDistance: 200,
    workerEnabled: true,
  }
}

function WalletGraphView(props) {
  const ref = React.useRef(null);
  const [graph, setGraph] = useState(null);
  var width = 1400;
  var height = 1200;

  // get mock data from mock-graph.json transaction.
  // const walletTransactionsMock = [];

  const currentWallet = props.currentWallet;
  // const currentWallet = { id: "0x04786aada9deea2150deab7b3b8911c309f5ed90", currentBalance: 100, assetType: "eth", transactions: walletTransactionsMock};
  console.log("WalletGraphView currentWallet => ", currentWallet);

  useEffect(() => {
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
                cursor: "pointer",
              },
            },
            style: {
              stroke: "#B4B4B4",
              width: 150,
            },
          },
          defaultEdge: {
            // shape: "polyline",
            type: "quadratic",
            style: {
              endArrow: true,
              lineWidth: 3,
            },
            labelCfg: {
              autoRotate: true,
            },
          },
          layout: GetLayout(currentWallet),
          modes: {
            default: [
              'drag-canvas', 'drag-node', 'click-select', 'activate-relations', 
              {
                type: "tooltip",
                formatText(model) {
                  console.log(" node tooltip model => ", model);
                  const node_details =  "<strong>Wallet </strong>: " + model.id;
                  return node_details;
                },
              },
              {
                type: "edge-tooltip", 
                formatText(model) {
                  // The content of tooltip
                  console.log("edge tooltip model => ", model);
                  const text =
                    "<strong>Transaction ID</strong>: " +
                    model.data.id +
                    "<br/> <strong>Risk</strong>: " +
                    model.data.riskTriggered +
                    " [" +
                    model.data.risk +
                    "]" +
                    "<br/> <strong>Counter Entity</strong>: " +
                    model.data.counterEntity +
                    "<br/> <strong>value</strong>: " +
                    model.data.value +
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

  // graph data
  const graphData = {
    nodes: [],
    edges: [],
  };
  if (!_.isEmpty(currentWallet) && !_.isEmpty(currentWallet.transactions)) {
    const transactions = currentWallet.transactions;
    graphData.nodes.push({
      id: currentWallet.id,
      label:
        shortenAddress(currentWallet.id) +
        "\n" +
        convertToPrecision(currentWallet.currentBalance, CryptoPrecision) +
        " " +
        currentWallet.assetType, // The label of the node
      size: 120,
      labelCfg: {
        style: {
          fontSize: 15,
        },
      },
    });

    var queue = [];
    var processedTxns = [];
    queue.push(currentWallet.id);
    while (!_.isEmpty(queue)) {
      const headAddr = queue.pop();
      for (const txn of transactions) {
        if (
          txn.fromAddress == headAddr &&
          !processedTxns.includes(txn.id) 
        ) {
          queue.push(txn.toAddress);
          processedTxns.push(txn.id);
          graphData.nodes.push(CreateNode(txn));
          graphData.edges.push(CreateEdge(txn));
        } 
      }
    }
  }

  if (graph) {
    graph.data(graphData);
    G6.Util.processParallelEdges(graphData.edges, 20);
    graph.changeSize(width, 800);
    graph.render();
    // graph.fitCenter();

    graph.on("node:mouseenter", (event) => {
      console.log("node:mouseenter >>>", event);
    });

    graph.on("node:click", (event) => {
      console.log(" node:click => ", event);
      window.location.replace("/wallet-details/" + event.item._cfg.model.id);
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
