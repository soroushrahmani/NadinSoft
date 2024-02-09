import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '../src/assets/index.css';
import { createI18n } from 'vue-i18n';
import en from './locales/en';
import fa from './locales/fa';

const i18n = createI18n({
  locale: store.state.language as 'en' | 'fa',
  legacy: false, 
  messages: { en, fa },
});

document.documentElement.dir = localStorage.getItem('direction') || 'ltr';

store.watch(
  (state) => state.language,
  (newLanguage) => {
    i18n.global.locale.value = newLanguage as 'en' | 'fa'; 
    const newDirection = newLanguage === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dir = newDirection;
    localStorage.setItem('direction', newDirection);
  }
);

createApp(App).use(store).use(router).use(i18n).mount('#app');
