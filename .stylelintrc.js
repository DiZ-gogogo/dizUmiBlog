module.exports = {
  extends: [
    "stylelint-config-standard", // 保留默认配置
    "stylelint-config-tailwindcss", // Tailwind CSS 支持
    require.resolve('@umijs/max/stylelint'), // UmiJS 的 stylelint 配置
  ],
  ignoreFiles:[
    '**/*.min.css', // 忽略所有 .min.css 文件
    'node_modules/**', // 忽略 node_modules 目录下的所有文件
    'dist/**', // 忽略 dist 目录下的所有文件
    'public/**',
    'api/**',
    '!**/*.stylelintrc.js' // 不忽略 .stylelintrc.js 文件
  ],
  rules: {
    // 可以根据需要添加或修改规则
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["tailwind", "apply", "screen"] // 忽略 Tailwind CSS 的 at-rule
      }
    ]
  }
};
