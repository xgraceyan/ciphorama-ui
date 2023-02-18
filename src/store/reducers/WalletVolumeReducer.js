import _ from 'underscore'

// this reducer responsibel for accounts ary and currentWallet;
const initState = {
  data: []
}

const truncateDate = (d) => {
  const timestamp = new Date(d).getTime()
  const truncatedTimestamp = new Date(
    Math.floor(timestamp / (1000 * 60 * 60 * 24 * 30)) *
      (1000 * 60 * 60 * 24 * 30)
  ).getTime()

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const formattedDate = formatter.format(truncatedTimestamp)

  return formattedDate
}

const transformData = data => {
  return data
    .flatMap(item => [
      { type: truncateDate(item.period), value: item.in },
      { type: truncateDate(item.period)+" ", value: -item.out }
    ])
    .map(item => ({
      type: item.type,
      value: item.value
    }))
}

const WalletVolumeReducer = (state = initState, action) => {
  let wallet_volume = state.wallet_volume
  switch (action.type) {
    case 'WALLET_VOLUME_LOADING_SUCCESS':
      let currHistogram = action.wallet_volume.histogram
      currHistogram.histogram = action.wallet_volume.histogram
      if (!_.isEmpty(currHistogram)) {
        wallet_volume = currHistogram
      }
      console.log(transformData(wallet_volume))
      return {
        ...state,
        data: transformData(wallet_volume)
      }
    default:
      console.log(' walletVolume unknown action: ', action)
      return {
        ...state
      }
  }
}

export default WalletVolumeReducer
