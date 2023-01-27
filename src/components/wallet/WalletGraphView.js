import React from "react";
import { connect } from "react-redux";
import G6 from "@antv/g6";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
var ReactDOM = require("react-dom");

function WalletGraphView(props) {
  const ref = React.useRef(null);
  const [graph, setGraph] = useState(null);

  const data = {
    // The array of nodes
    nodes: [
      {
        id: "node1", // String, unique and required
        label: "0xa2", // The label of the node
        x: 100,
        y: 300,
      },
      {
        id: "node2",
        x: 500,
        y: 400,
        label: "0xa1",
        size: 120,
      },
    ],
    // The array of edges
    edges: [
      // An edge links from node1 to node2
      {
        source: "node1", // String, required, the id of the source node
        target: "node2", // String, required, the id of the target node
        label: "Transaction", // The label of the edge
      },
    ],
  };

  useEffect(() => {
    console.log(graph);
    if (!graph) {
      setGraph(
        new G6.Graph({
          container: ReactDOM.findDOMNode(ref.current),
          width: 1000,
          height: 400,
          defaultNode: {
            shape: "node",
            size: 75,
            labelCfg: {
              style: {
                fill: "#000000A6",
                fontSize: 25,
              },
            },
            style: {
              stroke: "#72CC4A",
              width: 150,
            },
          },
          defaultEdge: {
            shape: "polyline",
          },
        })
      );
    }
  }, [data]);

  if (graph) {
    graph.data(data);
    graph.render();
    graph.fitCenter();
  }

  return <div ref={ref} style={{ width: "100%", textAlign: "center" }}></div>;
}

const mapStateToProps = (state) => {
  return {
    currentAcct: state.accounts.currentAcct,
    accounts: state.accounts.accounts,
    transactions: state.transactions.transactions,
  };
};

export default connect(mapStateToProps)(WalletGraphView);
