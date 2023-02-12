import _ from "underscore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Table, Tag, Space, Inflow, Button, DatePicker, Tooltip } from "antd";
import { SearchOutlined, SignalFilled, MoreOutlined } from "@ant-design/icons";
import { wallet_detail_url} from "../Constants";

export const riskColor = (risk, name) => {
  if (risk == "Critical") return <div style={{ color: "#800000" }}>{name}</div>;
  if (risk == "High") return <div style={{ color: "#f5222d" }}>{name}</div>;
  if (risk == "Medium") return <div style={{ color: "#ffc53d" }}>{name}</div>;
  if (risk == "Low") return <div style={{ color: "#52c41a" }}>{name}</div>;
};

export const riskColorAlt = (risk, name) => {
  if (risk == "Critical") return <div style={{ color: "#f5222d" }}>{name}</div>;
  if (risk == "High") return <div style={{ color: "#ffa940" }}>{name}</div>;
  if (risk == "Medium") return <div style={{ color: "#fadb14" }}>{name}</div>;
  if (risk == "Low") return <div style={{ color: "#52c41a" }}>{name}</div>;
};

export const riskBadgeColor = (risk) => {
  if (risk == "Critical") return "maroon";
  if (risk == "High") return "red";
  if (risk == "Medium") return "gold";
  if (risk == "Low") return "green";
};

export const riskScoreCalc = (riskScore) => {
  if (riskScore > 0.8) return "Critical";
  if (riskScore > 0.6) return "High";
  if (riskScore > 0.4) return "Medium";
  if (riskScore <= 0.2) return "Low";
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

export const riskTriggeredSearch = (riskTriggered) => {
  if (!_.isEmpty(riskTriggered)) {
    if (riskTriggered.length > 2) {
      return (
        <Space>
          {riskTriggered[0]}
          {riskTriggered[1]}
          <Tooltip title={riskTriggered}>
            <MoreOutlined style={{ cursor: "pointer" }} />
          </Tooltip>
        </Space>
      );
    } else {
      return (
        <Space>
          {riskTriggered[0]}
          {riskTriggered[1]}
        </Space>
      );
    }
  } else {
    return null;
  }
}

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

export function convertToPrecision(num, precision) {
  if (num === null || typeof num === 'undefined') {
    return num;
  }
  return parseFloat(num.toFixed(precision));
}

export function formatDate(dateString) {
  if (dateString === null || typeof dateString === 'undefined') {
      return dateString
  }
  const date = new Date(dateString);
  return date.toLocaleString();
}

export function EthereumIcon() {
  return (
    <>
      <FontAwesomeIcon icon={faEthereum} /> ETH
    </>
  );
}

export function styledField(text) {
  return (
    <span style={{ color: '#0b3d91', fontWeight: 'bold', fontSize: '100%' }}>
      {text}
    </span>
  );
}

export function generateWalletUrl(text) {
    const url = `${wallet_detail_url}${text}`;
    const shortAddress = shortenAddress(text);
    return <a href={url}>{shortAddress}</a>;
}

export const TextWithBox = (text) => {
  return (
    <Tag color={riskBadgeColor(text)}  style={{ transform: "scale(1.2)" }} > <b>{text} </b></Tag>
  );
};