// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['module:metro-react-native-babel-preset'],
//     plugins: [
//       'nativewind/babel',
//       [
//         'module:react-native-dotenv',
//         {
//           moduleName: '@env',
//           path: '.env',
//         },
//       ],
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            tests: ['./tests/'],
            '@components': './src/components',
          },
        },
      ],
    ],
  };
};
