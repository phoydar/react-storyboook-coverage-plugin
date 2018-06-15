module.exports = {
  hooks: {
    'pre-push': 'npm run prettier:check && npm run eslint:check',
  },
}
