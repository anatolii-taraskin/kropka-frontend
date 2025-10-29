import { ref, unref, watch } from 'vue';

export function useCachedResourceLoader({
  apiLanguage,
  fetcher,
  hasData,
  onError,
  immediate = true,
} = {}) {
  const lastLoadedLang = ref('');

  const resolveHasData = () => {
    if (typeof hasData === 'function') {
      try {
        return Boolean(hasData());
      } catch (error) {
        return false;
      }
    }

    return Boolean(unref(hasData));
  };

  const loadForLang = async (lang, { force = false } = {}) => {
    if (!lang || typeof fetcher !== 'function') {
      return;
    }

    if (!force && lastLoadedLang.value === lang && resolveHasData()) {
      return;
    }

    try {
      await fetcher(lang);
      lastLoadedLang.value = lang;
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error);
      }

      if (!resolveHasData()) {
        lastLoadedLang.value = '';
      }

      throw error;
    }
  };

  const loadCurrent = () => loadForLang(apiLanguage?.value, { force: true });

  if (apiLanguage && typeof apiLanguage === 'object') {
    watch(
      apiLanguage,
      (lang) => {
        loadForLang(lang).catch(() => {});
      },
      { immediate },
    );
  }

  return {
    lastLoadedLang,
    loadForLang,
    loadCurrent,
  };
}
