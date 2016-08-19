// import { get } from '../utils/http'
//
// export default async (ctx) => {
//   await get('/xxx')
//     .then((res) => {
//       return res.xxx
//     })
// }

import getAssets from '../utils/get-assets'

export default async (ctx) => {
  await ctx.render('index', {
    assets: getAssets()
  })
}
