![image-20200614232348560](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614232348560.png)

![image-20200614232422401](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614232422401.png)

![image-20200614232440291](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614232440291.png)

![image-20200614232610533](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614232610533.png)



## 安装

```js
npx -p @storybook/cli sb init
```



## 配置TS

![image-20200614233230814](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614233230814.png)



## 修改配置文件

应该是自动安装就可以了

```js
module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};

```

