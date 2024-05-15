module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            "@styles": "./app/styles",
            "@assets": "./assets",
            "@screen": "./app/screens",
            "@components": "./app/components",
            "@navigation": "./app/navigation"
          },
        },
      ],
    ],
  };
};
