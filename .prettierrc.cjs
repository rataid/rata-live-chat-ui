module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,

  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],

  // @trivago/prettier-plugin-sort-imports
  importOrder: [
    '^@((config|libs|nui)?/(.*)|utils)$',
    '^@(models|gql|features|shared)/(.*)$',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
}
