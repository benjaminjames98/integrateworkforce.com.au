module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-env", {
      "forceAllTransforms": true,
      "useBuiltIns": "usage",
      "corejs": "3.3.2"
    }]
  ];
  return {presets};
};
