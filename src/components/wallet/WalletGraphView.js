import React from "react";
import { connect } from "react-redux";
import G6 from "@antv/g6";
import { useEffect } from "react";
import { useState } from "react";
import _ from "underscore";
import { shortenAddress } from "./Utils";
var ReactDOM = require("react-dom");

function CreateNode(txn, x, y) {
  return {
    id: txn.toAddress,
    // x: x,
    // y: y,
    size: 80,
    label:
      shortenAddress(txn.toAddress) +
      "\n" +
      txn.value +
      " " +
      txn.assetType,
    data: txn,
  }
}

function CreateEdge(txn) {
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

function WalletGraphView(props) {
  const ref = React.useRef(null);
  const [graph, setGraph] = useState(null);
  var width = 1400;
  var height = 800;

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
          modes: {
            default: [
              { type: 'drag-canvas',},
              { type: 'drag-node', },
              { type: 'click-select' },
              { type: 'activate-relations'},
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
            layout: {
              type: 'dendrogram', // 'mindmap', // 'dendrogram', // 'indented', // , // Layout type
              direction: 'LR', // Layout direction is from the left to the right. Options: 'H' / 'V' / 'LR' / 'RL' / 'TB' / 'BT'
              // nodeSep: 20, // The distance between nodes
              // rankSep: 10, // The distance between adjacent levels
              // radial: true,
            },
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

  const walletTransactionsMock = [
    {
      id: "0xacb4c9c7ec4fbccacffd4d32303d963cac4b4a58c97246540861216d05682f71",
      fromAddress: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
      toAddress: "0x7f19720a857f834887fc9a7bc0a0fbe7fc7f8102",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 150,
      activityTime: "2019-02-20T02:36:32Z",
    },
    {
      id: "0x8012017ff87d491e16a16742304801da1672eeabe779122ed2ced8165ca198b9",
      fromAddress: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
      toAddress: "0x7f19720a857f834887fc9a7bc0a0fbe7fc7f8102",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 43,
      activityTime: "2019-04-16T03:38:20Z",
    },
    {
      id: "0x0abfd8a7051bc5a2e4c3261a651045aee6abb6074f13a7650a37d593daedfc86",
      fromAddress: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
      toAddress: "0xed3f5352ba43f85a5e1e2218f5085ce6106a214f",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 1,
      activityTime: "2017-02-25T05:04:03Z",
    },
    {
      id: "0xa7e764a5f1dc437af57c9ee93b2aad79007e1e121c6db284d8c0022d65d89432",
      fromAddress: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
      toAddress: "0xed3f5352ba43f85a5e1e2218f5085ce6106a214f",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 1,
      activityTime: "2017-02-21T21:54:10Z",
    },
    {
      id: "0x809c745432694ba63fdeb32825ef3c6bdf532f47355f90d6df74410e6cf06af5",
      fromAddress: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
      toAddress: "0xed3f5352ba43f85a5e1e2218f5085ce6106a214f",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 25,
      activityTime: "2017-02-20T22:07:49Z",
    },
    {
      id: "0x01df47300ba3ba2553520b73d01c39d016af423e6bd434b2e92174cd62082685",
      fromAddress: "0x04786aada9deea2150deab7b3b8911c309f5ed90",
      toAddress: "0xc062dceed93087c9112ff7b02d53e928e49cec09",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 5000,
      activityTime: "2016-05-12T08:23:32Z",
    },
    {
      id: "0x8967bb1414c8f3466371f71aa518fd9eecc199b6acd5c652c0e0acd5bab0ad93",
      fromAddress: "0x04786aada9deea2150deab7b3b8911c309f5ed90",
      toAddress: "0x3a08d18f47a7a3de10c2d4eb530f9b0dcfd60305",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 2000,
      activityTime: "2016-05-12T08:54:40Z",
    },
    {
      id: "0x2b3b8d2d785f3d5dce536a34f74c4dd4a3f815b7b82388c90c43854e2e5aec5d",
      fromAddress: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
      toAddress: "0xed3f5352ba43f85a5e1e2218f5085ce6106a214f",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 2,
      activityTime: "2017-02-25T13:57:21Z",
    },
    {
      id: "0xa5d28793d4b4003134232bf6a9d3372c4da5e4a5f8228625168338c7f43cb696",
      fromAddress: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
      toAddress: "0xed3f5352ba43f85a5e1e2218f5085ce6106a214f",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 9,
      activityTime: "2017-02-25T00:12:25Z",
    },
    {
      id: "0x682f497540eac08fbacd4bdc6c1613b3c3a360abc03e232548f65e8365b83661",
      fromAddress: "0xc062dceed93087c9112ff7b02d53e928e49cec09",
      toAddress: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 5000,
      activityTime: "2016-05-12T08:26:34Z",
    },
    {
      id: "0x9b18af1e595a6def2e03f71e3e312cd86551a5b6fdfc25bdea30b4468a42946b",
      fromAddress: "0x3a08d18f47a7a3de10c2d4eb530f9b0dcfd60305",
      toAddress: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 2000,
      activityTime: "2016-05-12T08:57:21Z",
    },
    {
      id: "0x975e5e5956d96269bbd8f6e0f0b4c4824961456b14f6ef17094e4b63cce210a5",
      fromAddress: "0x32be343b94f860124dc4fee278fdcbd38c102d88",
      toAddress: "0xed3f5352ba43f85a5e1e2218f5085ce6106a214f",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 1,
      activityTime: "2017-02-22T15:28:46Z",
    },
    {
      id: "0x4280aec7d748c9200ca7b1d8e7b185472c8dbf6e62868953b82a0f816254565a",
      fromAddress: "0x3a08d18f47a7a3de10c2d4eb530f9b0dcfd60305",
      toAddress: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 4000,
      activityTime: "2016-05-13T02:54:54Z",
    },
    {
      id: "0x600975dc3e488005238e7a5008fae0f7bda376435619ff085da1b2e1e76b3559",
      fromAddress: "0x04786aada9deea2150deab7b3b8911c309f5ed90",
      toAddress: "0x3a08d18f47a7a3de10c2d4eb530f9b0dcfd60305",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 4000,
      activityTime: "2016-05-13T02:53:02Z",
    },
    {
      id: "0x2b96afa80e418329001609d1c2f711cd55838728ef4dacceebb9063b9a4955bb",
      fromAddress: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
      toAddress: "0xeb71af7cd339832ff8d88d985035b2793042eca8",
      risk: "High",
      riskTriggered: "scam",
      direction: "Outbound",
      counterEntity: "",
      assetType: "eth",
      value: 0,
      activityTime: "2018-06-21T11:41:56Z",
    },
  ];
  // const currentWallet = props.currentWallet;
  const currentWallet = { id: "0x04786aada9deea2150deab7b3b8911c309f5ed90", currentBalance: 100, assetType: "eth", transactions: walletTransactionsMock};
  console.log(" WalletGraphView currentWallet => ", currentWallet);
  if (!_.isEmpty(currentWallet) && !_.isEmpty(currentWallet.transactions)) {
    const transactions = currentWallet.transactions;
    height = 0;
    var yCoordGap = 20; // height / transactions.length;
    const xCoordGap = 30;
    var yCoord = yCoordGap;
    var xCoord = xCoordGap;

    graphData.nodes.push({
      id: currentWallet.id,
      label:
        shortenAddress(currentWallet.id) +
        "\n" +
        currentWallet.currentBalance +
        " " +
        currentWallet.assetType, // The label of the node
      // x: 0,
      // y: height / 2,
      size: 120,
      labelCfg: {
        style: {
          fontSize: 15,
        },
      },
    });

    var queue = [];
    var processedTxns = [];
    var existingNodes = [];
    var processedNodes = [];
    var multiEdgeNodes = [];

    queue.push(currentWallet.id);
    var levelLen = queue.length;

    while (!_.isEmpty(queue)) {
      const headAddr = queue.pop();
      levelLen--;
      if (levelLen == 0) {
        yCoord = 10;   // reset up one breadth level.  
      }
      for (const txn of transactions) {
        if (
          txn.fromAddress == headAddr &&
          !processedTxns.includes(txn.id) 
          // && !existingNodes.includes(txn.toAddress)
        ) {
          queue.push(txn.toAddress);
          processedTxns.push(txn.id);
          existingNodes.push(txn.toAddress);

          yCoord += 100;
          graphData.nodes.push(CreateNode(txn, xCoord - xCoordGap, yCoord - yCoordGap + 150));
          if (yCoord > height) {
            height = yCoord;
          }
          graphData.edges.push(CreateEdge(txn));
          console.log("rendering node x, y", xCoord - xCoordGap, yCoord - yCoordGap + 150, yCoord, height);
        } 
      }
      xCoord += 200;
      if (levelLen == 0) {
        levelLen = queue.length;
      }
    }
  }

  if (graph) {
    graph.data(graphData);
    G6.Util.processParallelEdges(graphData.edges, 20);
    graph.changeSize(width, 800);
    graph.render();
    graph.fitCenter();

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
