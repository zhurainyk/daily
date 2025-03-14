module.exports = webpack =>
{
  const viewportWidth = webpack.webpackLoaderContext.resourcePath.includes('h5')
    ? 375
    : 1920
  return {
    plugins: [
      ['postcss-url', {}],
      ['postcss-aspect-ratio-mini', {}],
      ['postcss-write-svg', { utf8: false }],
      [
        'postcss-px-to-viewport-8-plugin',
        {
          viewportWidth, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
          unitPrecision: 6, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          fontViewportUnit: 'vw',
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: ['.ignore', '.ignore-*', '.hairlines', '.itemrect', 'withperson', 'elevator'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: true // 允许在媒体查询中转换`px`
        }
      ],
      [
        'cssnano',
        {
          'cssnano-preset-advanced': {
            zindex: false,
            autoprefixer: true
          }
        }
      ]
    ]
  }
}
