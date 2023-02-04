import _ from "underscore";

export const riskColor = (risk, name) => {
    if (risk == "High") return <div style={{ color: "#f5222d" }}>{name}</div>;
    if (risk == "Medium") return <div style={{ color: "#ffc53d" }}>{name}</div>;
    if (risk == "Low") return <div style={{ color: "#52c41a" }}>{name}</div>;
};

export const riskBadgeColor = (risk) => {
    if (risk == "High") return "red";
    if (risk == "Medium") return "gold";
    if (risk == "Low") return "green";
  };

export const riskScoreColor = (riskScore) => {
    if (riskScore > 0.7) return <div style={{ color: "#f5222d" }}>{"High"}</div>;
    if (riskScore > 0.5) return <div style={{ color: "#ffc53d" }}>{"Medium"}</div>;
    if (riskScore <= 0.5) return <div style={{ color: "#52c41a" }}>{"Low"}</div>;
  };

export const riskTriggeredColor = (riskTriggered) => {
    var riskArr = [];
    if (!_.isEmpty(riskTriggered)) {
      riskTriggered.forEach((risk) => {
        riskArr.push(riskScoreColor(risk));
      });
    }
    return riskArr;
};
