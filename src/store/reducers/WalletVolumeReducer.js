import _ from 'underscore'

// this reducer responsibel for accounts ary and currentWallet;
const initState = {
  data: []
}

// const transformData = data => {
//   return data
//     .flatMap(item => [
//       { type: item.period.slice(0, 13), value: item.in },
//       { type: item.period.slice(0, 13), value: -item.out }
//     ])
//     .map(item => ({
//       type: item.type,
//       value: item.value
//     }))
// }

function transformData (arr) {
    const result = []
    for (let i=0; i < arr.length; i++) {
        result.push({
            time: arr[i].period.slice(0, 10),
            type: 'inflow (ETH)',
            value: arr[i].in,
        })
        result.push({
            time: arr[i].period.slice(0, 10),
            type: 'outflow (ETH)',
            value: -arr[i].out,
        })
    }
    return result
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
