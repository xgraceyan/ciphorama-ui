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

export const riskScoreCalc = (riskScore) => {
  if (riskScore > 0.7) return "High";
  if (riskScore > 0.5) return "Medium";
  if (riskScore <= 0.5) return "Low";
};

export const riskTriggeredColor = (riskTriggered) => {
  var riskArr = [];
  console.log("RISKTRIGGERD >> ", riskTriggered);
  if (!_.isEmpty(riskTriggered)) {
    riskTriggered.forEach((risk) => {
      riskArr.push(riskColor(riskScoreCalc(risk.score), risk.name));
    });
  }
  return riskArr;
};

export const shortenAddress = (address) => {
  if (!_.isEmpty(address)) {
    return (
      address.substring(0, 5) +
      "..." +
      address.substring(address.length - 4, address.length)
    );
  }
  return address;
};
