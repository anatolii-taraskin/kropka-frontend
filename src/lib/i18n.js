export const LOCALES = [
  {
    code: 'ru',
    label: 'Русский',
    pathSegment: '',
    apiLang: 'ru',
    intlLocale: 'ru-RU',
  },
  {
    code: 'en',
    label: 'English',
    pathSegment: 'en',
    apiLang: 'en',
    intlLocale: 'en-US',
  },
  {
    code: 'ka',
    label: 'ქართული',
    pathSegment: 'ka',
    apiLang: 'en',
    intlLocale: 'ka-GE',
  },
];

export const DEFAULT_LOCALE_CODE = 'ru';

export const translations = {
  ru: {
    navigation: {
      about: 'о нас',
      pricing: 'цены',
      equipment: 'оборудование',
      teachers: 'преподаватели',
    },
    routes: {
      about: { title: 'О нас — Kropka Studio' },
      pricing: { title: 'Цены — Kropka Studio' },
      equipment: { title: 'Оборудование — Kropka Studio' },
      teachers: { title: 'Преподаватели — Kropka Studio' },
      apiTest: { title: 'API тесты — Kropka Studio' },
    },
    header: {
      openMenu: 'Открыть меню',
    },
    about: {
      hero: {
        pricingCta: 'Прайс',
        scheduleCta: 'Расписание и инфо',
      },
      title: 'О нас',
      noInfo: 'Информация о студии появится позже.',
      servicesTitle: 'Услуги',
      bookingCta: 'Записаться в Telegram',
      copyPhone: 'Скопировать телефон: {phone}',
      contactsTitle: 'Контакты',
      contactsEmpty: 'Контакты уточняются.',
      linksTitle: 'Ссылки',
      linksEmpty: 'Ссылки появятся позже.',
      rulesTitle: 'Правила студии',
      rulesLoading: 'Загружаем правила студии...',
      rulesEmpty: 'Правила пока не опубликованы.',
      links: {
        instagram: '📸 Instagram',
        facebook: '📘 Facebook',
        telegramChannel: '💬 Telegram-канал',
        telegram: '💬 Telegram',
        telegramAdmin: '👤 Администратор в TG',
        website: '🌐 Сайт',
      },
    },
    pricing: {
      title: 'Прайс',
      loading: 'Загружаем актуальные цены...',
      loadError: 'Не удалось загрузить прайс. Попробуйте обновить страницу.',
      retry: 'Повторить запрос',
      empty: 'Цены скоро появятся.',
      bookCta: 'Записаться',
      promotionDefault: 'Скидка 20% при покупке месячного абонемента на 5 занятий.',
      promotionHighlights: ['Скидка 20%', 'месячного абонемента'],
      pricesNote: 'Цены указаны в лари (₾).',
      bookingNoteIntro: 'Актуальные слоты и бронирование — через',
      bookingNoteAdmin: 'администратора в Telegram',
      bookingNoteFallback: 'Актуальные слоты уточняйте у администратора.',
    },
    equipment: {
      title: 'Оборудование',
      loading: 'Загружаем список...',
      loadError: 'Не удалось загрузить оборудование. Попробуйте обновить страницу.',
      retry: 'Повторить запрос',
      empty: 'Пока нет опубликованного оборудования.',
    },
    teachers: {
      title: 'Преподаватели',
      loading: 'Загружаем преподавателей...',
      loadError: 'Не удалось получить список преподавателей. Попробуйте снова.',
      retry: 'Повторить запрос',
      empty: 'Пока нет активных преподавателей.',
      contact: {
        telegram: 'Написать в TG',
        instagram: 'Instagram',
        facebook: 'Facebook',
        website: 'Сайт',
      },
    },
    apiTest: {
      title: 'Тестирование публичного API',
      description:
        'Используйте кнопки ниже, чтобы выполнить запросы, описанные в <code>openapi.yaml</code>. Ответы выводятся в консоль браузера, а сводка — в таблице ниже.',
      preferredLang: 'Язык ответа (опционально):',
      langPlaceholder: 'ru / en',
      clearLog: 'Очистить журнал',
      logTitle: 'Журнал запросов',
      emptyLog: 'Пока нет выполненных запросов.',
      requestRunning: 'Выполняем запрос...',
      requestSuccess: 'Успех (HTTP {status})',
      requestError: 'Ошибка запроса',
      status: {
        pending: 'в процессе',
        success: 'успех',
        error: 'ошибка',
      },
      durationUnit: 'мс',
      endpoints: {
        studio: { label: 'Студия', description: 'Информация о студии' },
        prices: { label: 'Прайс', description: 'Активные тарифы' },
        equipment: { label: 'Оборудование', description: 'Список оборудования' },
        teachers: { label: 'Преподаватели', description: 'Команда преподавателей' },
        rules: { label: 'Правила', description: 'Правила студии' },
      },
    },
    footer: {
      mapTitle: 'Kropka Music Studio на карте',
      openInMaps: 'Открыть в Google Maps',
      getDirections: 'Проложить маршрут',
    },
    copyButton: {
      copied: 'Скопировано: {value}',
      failed: 'Не удалось скопировать',
    },
  },
  en: {
    navigation: {
      about: 'about',
      pricing: 'pricing',
      equipment: 'equipment',
      teachers: 'teachers',
    },
    routes: {
      about: { title: 'About — Kropka Studio' },
      pricing: { title: 'Pricing — Kropka Studio' },
      equipment: { title: 'Equipment — Kropka Studio' },
      teachers: { title: 'Teachers — Kropka Studio' },
      apiTest: { title: 'API tests — Kropka Studio' },
    },
    header: {
      openMenu: 'Open menu',
    },
    about: {
      hero: {
        pricingCta: 'Pricing',
        scheduleCta: 'Schedule & info',
      },
      title: 'About us',
      noInfo: 'Studio information will be added soon.',
      servicesTitle: 'Services',
      bookingCta: 'Book via Telegram',
      copyPhone: 'Copy phone: {phone}',
      contactsTitle: 'Contacts',
      contactsEmpty: 'Contacts will be updated soon.',
      linksTitle: 'Links',
      linksEmpty: 'Links will be added later.',
      rulesTitle: 'Studio rules',
      rulesLoading: 'Loading studio rules...',
      rulesEmpty: 'The rules are not published yet.',
      links: {
        instagram: '📸 Instagram',
        facebook: '📘 Facebook',
        telegramChannel: '💬 Telegram channel',
        telegram: '💬 Telegram',
        telegramAdmin: '👤 Telegram admin',
        website: '🌐 Website',
      },
    },
    pricing: {
      title: 'Pricing',
      loading: 'Loading current prices...',
      loadError: 'Failed to load pricing. Try refreshing the page.',
      retry: 'Try again',
      empty: 'Prices will be available soon.',
      bookCta: 'Book now',
      promotionDefault: '20% off when you buy a monthly pass for 5 sessions.',
      promotionHighlights: ['20% off', 'monthly pass'],
      pricesNote: 'Prices are listed in lari (₾).',
      bookingNoteIntro: 'Up-to-date slots and booking — via',
      bookingNoteAdmin: 'the Telegram administrator',
      bookingNoteFallback: 'Check available slots with the administrator.',
    },
    equipment: {
      title: 'Equipment',
      loading: 'Loading the list...',
      loadError: 'Failed to load equipment. Try refreshing the page.',
      retry: 'Try again',
      empty: 'No equipment has been published yet.',
    },
    teachers: {
      title: 'Teachers',
      loading: 'Loading teachers...',
      loadError: 'Failed to load teachers. Please try again.',
      retry: 'Try again',
      empty: 'No teachers are published yet.',
      contact: {
        telegram: 'Message on Telegram',
        instagram: 'Instagram',
        facebook: 'Facebook',
        website: 'Website',
      },
    },
    apiTest: {
      title: 'Public API testing',
      description:
        'Use the buttons below to perform the requests described in <code>openapi.yaml</code>. Responses are printed to the browser console and summarized in the log below.',
      preferredLang: 'Response language (optional):',
      langPlaceholder: 'ru / en',
      clearLog: 'Clear log',
      logTitle: 'Request log',
      emptyLog: 'No requests have been executed yet.',
      requestRunning: 'Sending request...',
      requestSuccess: 'Success (HTTP {status})',
      requestError: 'Request error',
      status: {
        pending: 'in progress',
        success: 'success',
        error: 'error',
      },
      durationUnit: 'ms',
      endpoints: {
        studio: { label: 'Studio', description: 'Studio information' },
        prices: { label: 'Pricing', description: 'Active plans' },
        equipment: { label: 'Equipment', description: 'Equipment list' },
        teachers: { label: 'Teachers', description: 'Teaching team' },
        rules: { label: 'Rules', description: 'Studio rules' },
      },
    },
    footer: {
      mapTitle: 'Kropka Music Studio on the map',
      openInMaps: 'Open in Google Maps',
      getDirections: 'Get directions',
    },
    copyButton: {
      copied: 'Copied: {value}',
      failed: 'Copy failed',
    },
  },
  ka: {
    navigation: {
      about: 'ჩვენ შესახებ',
      pricing: 'ტარიფები',
      equipment: 'აპარატურა',
      teachers: 'მასწავლებლები',
    },
    routes: {
      about: { title: 'ჩვენ შესახებ — Kropka Studio' },
      pricing: { title: 'ტარიფები — Kropka Studio' },
      equipment: { title: 'აპარატურა — Kropka Studio' },
      teachers: { title: 'მასწავლებლები — Kropka Studio' },
      apiTest: { title: 'API ტესტები — Kropka Studio' },
    },
    header: {
      openMenu: 'მენიუს გახსნა',
    },
    about: {
      hero: {
        pricingCta: 'ტარიფები',
        scheduleCta: 'განრიგი და ინფორმაცია',
      },
      title: 'ჩვენ შესახებ',
      noInfo: 'სტუდიის ინფორმაცია მალე დაემატება.',
      servicesTitle: 'სერვისები',
      bookingCta: 'დაჯავშნა Telegram-ში',
      copyPhone: 'ტელეფონის კოპირება: {phone}',
      contactsTitle: 'კონტაქტები',
      contactsEmpty: 'კონტაქტები მალე განახლდება.',
      linksTitle: 'ბმულები',
      linksEmpty: 'ბმულები მოგვიანებით დაემატება.',
      rulesTitle: 'სტუდიის წესები',
      rulesLoading: 'სტუდიის წესების ჩატვირთვა...',
      rulesEmpty: 'წესები ჯერ გამოქვეყნებული არ არის.',
      links: {
        instagram: '📸 Instagram',
        facebook: '📘 Facebook',
        telegramChannel: '💬 Telegram არხი',
        telegram: '💬 Telegram',
        telegramAdmin: '👤 Telegram ადმინისტრატორი',
        website: '🌐 ვებსაიტი',
      },
    },
    pricing: {
      title: 'ტარიფები',
      loading: 'მიმდინარე ტარიფების ჩატვირთვა...',
      loadError: 'ტარიფების ჩატვირთვა ვერ მოხერხდა. სცადეთ გვერდის განახლება.',
      retry: 'ხელახლა სცადეთ',
      empty: 'ტარიფები მალე გამოჩნდება.',
      bookCta: 'დაჯავშნა',
      promotionDefault: '20%-იანი ფასდაკლება 5 გაკვეთილის თვისაბონემენტის შეძენისას.',
      promotionHighlights: ['20%-იანი ფასდაკლება', 'თვისაბონემენტის'],
      pricesNote: 'ფასები მითითებულია ლარებში (₾).',
      bookingNoteIntro: 'აქტუალური სლოტები და დაჯავშნა —',
      bookingNoteAdmin: 'Telegram-ის ადმინისტრატორი',
      bookingNoteFallback: 'აქტუალური სლოტები დააზუსტეთ ადმინისტრატორთან.',
    },
    equipment: {
      title: 'აპარატურა',
      loading: 'სიის ჩატვირთვა...',
      loadError: 'აპარატურის ჩატვირთვა ვერ მოხერხდა. სცადეთ გვერდის განახლება.',
      retry: 'ხელახლა სცადეთ',
      empty: 'ჯერჯერობით აპარატურა გამოქვეყნებული არ არის.',
    },
    teachers: {
      title: 'მასწავლებლები',
      loading: 'მასწავლებლების ჩატვირთვა...',
      loadError: 'მასწავლებლების სიის მიღება ვერ მოხერხდა. სცადეთ თავიდან.',
      retry: 'ხელახლა სცადეთ',
      empty: 'აქტიური მასწავლებლები ჯერ არ არიან.',
      contact: {
        telegram: 'მიწერე Telegram-ში',
        instagram: 'Instagram',
        facebook: 'Facebook',
        website: 'ვებსაიტი',
      },
    },
    apiTest: {
      title: 'საჯარო API-ის ტესტირება',
      description:
        'გამოიყენეთ ქვემოთ მოცემული ღილაკები <code>openapi.yaml</code>-ში აღწერილი მოთხოვნების შესასრულებლად. პასუხები იბეჭდება ბრაუზერის კონსოლში, ხოლო შეჯამება — ქვემოთ ჟურნალში.',
      preferredLang: 'პასუხის ენა (არასავალდებულო):',
      langPlaceholder: 'ru / en',
      clearLog: 'ჟურნალის გასუფთავება',
      logTitle: 'მოთხოვნების ჟურნალი',
      emptyLog: 'ჯერ მოთხოვნები არ შესრულებულა.',
      requestRunning: 'მოთხოვნა იგზავნება...',
      requestSuccess: 'წარმატება (HTTP {status})',
      requestError: 'მოთხოვნის შეცდომა',
      status: {
        pending: 'მიმდინარეობს',
        success: 'წარმატება',
        error: 'შეცდომა',
      },
      durationUnit: 'მს',
      endpoints: {
        studio: { label: 'სტუდია', description: 'სტუდიის ინფორმაცია' },
        prices: { label: 'ტარიფები', description: 'აქტიური ტარიფები' },
        equipment: { label: 'აპარატურა', description: 'აპარატურის სია' },
        teachers: { label: 'მასწავლებლები', description: 'მასწავლებელთა გუნდი' },
        rules: { label: 'წესები', description: 'სტუდიის წესები' },
      },
    },
    footer: {
      mapTitle: 'Kropka Music Studio რუკაზე',
      openInMaps: 'გახსენით Google Maps-ში',
      getDirections: 'მარშრუტის შედგენა',
    },
    copyButton: {
      copied: 'დაკოპირდა: {value}',
      failed: 'დაკოპირება ვერ მოხერხდა',
    },
  },
};

const localeMap = new Map(LOCALES.map((locale) => [locale.code, locale]));

export const LOCALE_MAP = Object.fromEntries(localeMap.entries());

export function getLocale(code) {
  return LOCALE_MAP[code] ?? LOCALE_MAP[DEFAULT_LOCALE_CODE];
}

function getNestedValue(source, pathSegments) {
  return pathSegments.reduce((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return current[segment];
    }
    return undefined;
  }, source);
}

export function translate(localeCode, key, values = {}) {
  const localeTranslations = translations[localeCode] ?? translations[DEFAULT_LOCALE_CODE] ?? {};
  const fallbackTranslations = translations[DEFAULT_LOCALE_CODE] ?? {};

  const segments = key.split('.');
  const raw =
    getNestedValue(localeTranslations, segments) ??
    getNestedValue(fallbackTranslations, segments) ??
    key;

  if (typeof raw !== 'string') {
    return raw;
  }

  return raw.replace(/\{(\w+)\}/g, (match, name) => {
    if (name in values) {
      return `${values[name]}`;
    }
    return match;
  });
}
