import { computed, inject } from 'vue';

const FALLBACK_LANG = 'ru';

export const useApiLanguage = () => {
  const currentLocale = inject('currentLocale', null);

  return computed(() => {
    if (!currentLocale) {
      return FALLBACK_LANG;
    }

    const locale = 'value' in currentLocale ? currentLocale.value : currentLocale;

    if (!locale) {
      return FALLBACK_LANG;
    }

    return locale.apiLang ?? locale.code ?? FALLBACK_LANG;
  });
};

export default useApiLanguage;
