/**
 * 各种环境变量
 */

// 是否开发模式, 一般情况下用这个就够了
export default process.env.NODE_ENV === 'development'
// export default false // 方便跟上一句切换, 用于本地模拟真实环境

// 是否生产模式
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// 是否karma测试模式
export const IS_KARMA = process.env.NODE_ENV === 'karma'

// webpack是否是中间件模式
export const IS_WEBPACK_MIDDLEWARE = process.env.WEBPACK_MODE === 'middleware'
