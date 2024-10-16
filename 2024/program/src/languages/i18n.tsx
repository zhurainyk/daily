import { createI18n } from 'vue-i18n'

const language = localStorage.getItem('lang') || 'ch'
const messages = {}
messages[language] = require(`./lang/${language}.json`)
const i18n = createI18n({
  globalInjection: true, // 全局生效$t
  legacy: false, // 处理报错Uncaught (in promise) SyntaxError: Not available in legacy mode (at message-compiler.esm-bundler.js:54:19)
  locale: language,
  messages
})

// import { useI18n } from "vue-i18n";
// const { locale } = useI18n();

// const changeLang = (val) => {
//   locale.value = val;
//   localStorage.setItem("lang", val);
// };
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();

// console.log('t("messages.home")', t("messages.home"))
export default i18n
