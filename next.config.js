module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpg|png|gif|jpeg|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            // 硬盘路径
            outputPath: 'static',
            // 网站路径
            publicPath: '_next/static',
          }
        }
      ]
    })

    return config
  }
}