const NextI18Next = require('next-i18next').default
const languages = ['en', 'fr']

const options = {
  defaultLanguage: 'en',
  otherLanguages: ['fr'],
  localePath: process.browser ? 'locales' : 'public/locales',
  detection: {
    cookieSameSite: 'strict'
  }
}

const NextI18NextInstance = new NextI18Next(options)

NextI18NextInstance.i18n.languages = languages

module.exports = NextI18NextInstance
