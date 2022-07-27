module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018, // 최신 문법 지원
    sourceType: "module", // 모듈 시스템 사용시
  },
  rules: {
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es8",
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
  plugins: ["prettier"],
};
