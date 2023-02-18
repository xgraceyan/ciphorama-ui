import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import { Column } from '@ant-design/plots'
import { useParams, useNavigate } from 'react-router-dom'

import { connect } from 'react-redux'
import { fetchWalletVolume } from '../../store/actions/AccountActions'

function WalletVolumeView (props) {
  let { wallet_addr } = useParams()
  const local_state = React.useState()
  const [state, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const navigate = useNavigate()

  React.useEffect(() => {
    console.log('Wallet Volume fetching wallet_addr :', wallet_addr)
    props.fetchWalletVolume(wallet_addr)
  }, [])

  console.log(' >>>', props.data)

  const data = props.data

  const paletteSemanticRed = '#F4664A'
  const brandColor = '#5B8FF9'
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ value }) => {
      // value undefined
      // console.log(type1, " ", value)
      if (value < 0.0) {
        return paletteSemanticRed
      }
      return brandColor
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    }
  }

  return <Column {...config} />
}

const mapStateToProps = state => {
  return {
    data: state.wallet_volume.data
  }
}

const mapDispatchToProps = dispatch => {
  console.log('const mapDispatchToProps = dispatch ')
  return {
    fetchWalletVolume: wallet_addr => dispatch(fetchWalletVolume(wallet_addr))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletVolumeView)
