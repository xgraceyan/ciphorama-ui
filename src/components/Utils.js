import _ from 'underscore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { Table, Tag, Space, Inflow, Button, DatePicker, Tooltip } from 'antd'
import { SearchOutlined, SignalFilled, MoreOutlined } from '@ant-design/icons'
import { wallet_detail_url } from '../Constants'

export const riskColor = (risk, name) => {
  if (risk == 'Critical') return <div style={{ color: '#800000' }}>{name}</div>
  if (risk == 'High') return <div style={{ color: '#f5222d' }}>{name}</div>
  if (risk == 'Medium') return <div style={{ color: '#ffc53d' }}>{name}</div>
  if (risk == 'Low') return <div style={{ color: '#52c41a' }}>{name}</div>
}

export const riskColorAlt = (risk, name) => {
  if (risk == 'Critical') return <div style={{ color: '#800000' }}>{name}</div>
  if (risk == 'High') return <div style={{ color: '#f5222d' }}>{name}</div>
  if (risk == 'Medium') return <div style={{ color: '#ffc53d' }}>{name}</div>
  if (risk == 'Low') return <div style={{ color: '#52c41a' }}>{name}</div>
}

export const riskBadgeColor = risk => {
  if (risk == 'Critical') return 'maroon'
  if (risk == 'High') return 'red'
  if (risk == 'Medium') return 'gold'
if (risk == 'Low') return 'green'
}

export const riskScoreCalc = riskScore => {
  if (riskScore > 0.75) return 'Critical'
  if (riskScore > 0.5) return 'High'
  if (riskScore > 0.25) return 'Medium'
  return 'Low'
}

export const riskTriggeredColor = riskTriggered => {
  var riskArr = []
  // console.log('RISKTRIGGERD >> ', riskTriggered)
  if (!_.isEmpty(riskTriggered)) {
    riskTriggered.forEach(risk => {
      riskArr.push(riskColor(risk.riskLevel, risk.name))
    })
  }
  return riskArr
}

export const riskTriggeredSearch = riskTriggered => {
  console.log(riskTriggered)
  if (!_.isEmpty(riskTriggered)) {
    if (riskTriggered.length === 1) {
      return (
        <Space>
          <Tag
            color={riskBadgeColor(riskTriggered[0])}
            style={{ transform: 'scale(1.1)' }}
          >
            {' '}
            {riskTriggered[0]} 
          </Tag>
        </Space>
      )
    } else if (riskTriggered.length === 2) {
      return (
        <Space>
          <Tag
            color={riskBadgeColor(riskTriggered[0])}
            style={{ transform: 'scale(1.1)' }}
          >
            {' '}
            {riskTriggered[0]} 
          </Tag>
          <Tag
            color={riskBadgeColor(riskTriggered[1])}
            style={{ transform: 'scale(1.1)' }}
          >
            {' '}
            {riskTriggered[1]} 
          </Tag>
        </Space>
      )
    } else {
      return (
        <Space>
          <Tag
            color={riskBadgeColor(riskTriggered[0])}
            style={{ transform: 'scale(1.1)' }}
          >
            {' '}
            {riskTriggered[0]} 
          </Tag>
          <Tag
            color={riskBadgeColor(riskTriggered[1])}
            style={{ transform: 'scale(1.1)' }}
          >
            {' '}
            {riskTriggered[1]}
          </Tag>
          <Tooltip title={riskTriggered}>
            <MoreOutlined style={{ cursor: 'pointer' }} />
          </Tooltip>
        </Space>
      )
    }
  } else {
    return null
  }
}

export const shortenAddress7 = address => {
  if (!_.isEmpty(address)) {
    return (
      address.substring(0, 5) +
      '...' +
      address.substring(address.length - 4, address.length)
    )
  }
  return address
}

export const shortenAddress = address => {
  if (!_.isEmpty(address)) {
    return address.substring(0, 10) + '...'
  }
  return address
}

export function convertToPrecision (num, precision) {
  if (num === null || typeof num === 'undefined') {
    return num
  }
  return parseFloat(num.toFixed(precision))
}

export function formatDate (dateString) {
  if (dateString === null || typeof dateString === 'undefined') {
    return dateString
  }
  const date = new Date(dateString)
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  return date.toLocaleString('en-US', options)
}

export function EthereumIcon () {
  return (
    <>
      <FontAwesomeIcon icon={faEthereum} /> ETH
    </>
  )
}

export function styledField (text) {
  return (
    <span style={{ color: '#0b3d91', fontWeight: 'bold', fontSize: '100%' }}>
      {text}
    </span>
  )
}

export function generateWalletUrl (text) {
  const url = `${wallet_detail_url}${text}`
  const shortAddress = shortenAddress(text)
  return <a href={url}>{shortAddress}</a>
}

export const TextWithBox = text => {
  return (
    <Tag color={riskBadgeColor(text)} style={{ transform: 'scale(1.1)' }}>
      {' '}
      <b>{text} </b>
    </Tag>
  )
}

export function TextWithBoxColor (text, color) {
  return (
    <Tag color={color} style={{ transform: 'scale(1.1)' }}>
      {' '}
      {text}
    </Tag>
  )
}

export function colorCodedNumber (number, color) {
  return (
    <div>
      <p
        style={{
          color: color,
          fontWeight: 'bold',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {(10 * number).toFixed(0)}{' '}
      </p>
    </div>
  )
}
