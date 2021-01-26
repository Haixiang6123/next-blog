module.exports = {
  webpack: (config, options) => {
    const isServer = options.isServer

    config.module.rules.push({
      test: /\.jpg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
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