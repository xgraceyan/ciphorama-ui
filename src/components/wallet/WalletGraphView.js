import React from "react";
import { connect } from "react-redux";
import { useNavigate, redirect, useHistory } from "react-router-dom";
import G6 from "@antv/g6";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import _ from "underscore";
import moment from "moment";
var ReactDOM = require("react-dom");

function WalletGraphView(props) {
  const ref = React.useRef(null);
  const [graph, setGraph] = useState(null);
  var yCoord = 0;

  const riskColor = (risk, name) => {
    if (risk == "High") return <div style={{ color: "#f5222d" }}>{name}</div>;
    if (risk == "Medium") return <div style={{ color: "#ffc53d" }}>{name}</div>;
    if (risk == "Low") return <div style={{ color: "#52c41a" }}>{name}</div>;
  };

  const data = {
    // The array of nodes
    nodes: [],
    // The array of edges
    edges: [],
  };

  useEffect(() => {
    console.log(graph);
    if (!graph) {
      setGraph(
        new G6.Graph({
          container: ReactDOM.findDOMNode(ref.current),
          width: 1000,
          height: 800,
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
              cursor: "pointer",
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
                    model.data.asset +
                    "<br/> <strong>Customer</strong>: " +
                    model.data.customer +
                    "<br/> <strong>Activity Time</strong>: " +
                    moment
                      .unix(model.data.activityTime)
                      .format("YYYY-MM-DD hh:mm:ss");
                  return text;
                },
              },
            ],
          },
        })
      );
    }
  }, []);

  if (!_.isEmpty(props.currentAcct)) {
    console.log("not empty");
    const yCoordGap = 600 / props.currentAcct.transactions.length;
    yCoord = yCoordGap;
    for (const txn of props.currentAcct.transactions) {
      data.nodes.push({
        id: txn.id,
        x: 0,
        y: yCoord,
        label: txn.counterAddress + "\n" + txn.volume + " " + txn.asset,
        data: txn,
        cursor: "pointer",
      });

      data.nodes.push({
        id: "sourceNode", // String, unique and required
        label:
          props.currentAcct.id +
          "\n" +
          props.currentAcct.currentBalance +
          " " +
          props.currentAcct.asset, // The label of the node
        x: 700,
        y: 400,
        size: 120,
        labelCfg: {
          style: {
            fontSize: 15,
          },
        },
      });

      if (txn.direction == "Inbound") {
        data.edges.push({
          source: txn.id,
          target: "sourceNode",
          label:
            txn.id +
            "\n" +
            moment.unix(txn.activityTime).format("YYYY-MM-DD hh:mm:ss"),
        });
      } else {
        data.edges.push({
          source: "sourceNode",
          target: txn.id,
          label:
            txn.id +
            "\n" +
            moment.unix(txn.activityTime).format("YYYY-MM-DD hh:mm:ss"),
        });
      }

      yCoord += yCoordGap;
    }
  }

  if (graph) {
    graph.data(data);
    graph.render();
    graph.fitCenter();

    graph.on("node:click", (event) => {
      console.log("EVENT>>>", event);
      window.location.replace(
        "/wallet-details/" + event.item._cfg.model.data.counterAddress
      );
    });
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
