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
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    // label: {
    //   position: 'middle',
    //   layout: [
    //     {
    //       type: 'interval-adjust-position',
    //     }, 
    //     {
    //       type: 'interval-hide-overlap',
    //     }, 
    //     {
    //       type: 'adjust-color',
    //     },
    //   ],
    // },
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
