module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  rules: {
    // 添加这一行来关闭 multi-word-component-names 规则
    'vue/multi-word-component-names': 'off',
  },
};
