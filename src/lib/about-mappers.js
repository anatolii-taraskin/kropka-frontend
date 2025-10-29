const toStringValue = (value) => (value == null ? '' : `${value}`.trim());

const pickFirstUrl = (...values) => values.map((value) => toStringValue(value)).find(Boolean) || '';

const toList = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(toStringValue).filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(toStringValue).filter(Boolean);
      }
    } catch (error) {
      // ignore invalid JSON strings
    }

    return trimmed
      .split(/\r?\n|[•\-–\u2022,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const getValuesByPrefix = (source = {}, prefix) =>
  Object.entries(source)
    .filter(([key]) => key.startsWith(`${prefix}_`))
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([, value]) => toStringValue(value))
    .filter(Boolean);

const normalizePhoneNumber = (value) => {
  const clean = toStringValue(value).replace(/[^+\d]/g, '');
  return clean.startsWith('+') ? clean : clean;
};

const buildFeatureList = (source = {}) => {
  const raw = [];

  const appendValues = (values) => {
    if (!values) {
      return;
    }

    if (Array.isArray(values)) {
      values.forEach((item) => raw.push(item));
      return;
    }

    toList(values).forEach((item) => raw.push(item));
  };

  appendValues(source.features);
  appendValues(source.features_list);
  appendValues(getValuesByPrefix(source, 'feature'));

  const features = [];
  const seen = new Set();

  raw.forEach((item) => {
    if (item && typeof item === 'object') {
      const text = toStringValue(item.text);
      if (!text || seen.has(text)) {
        return;
      }

      seen.add(text);
      features.push({
        icon: toStringValue(item.icon) || '•',
        text,
      });
      return;
    }

    const text = toStringValue(item);
    if (!text || seen.has(text)) {
      return;
    }

    seen.add(text);
    features.push({ icon: '•', text });
  });

  return features;
};

const buildServices = (source = {}) => {
  const raw = [
    ...toList(source.services),
    ...toList(source.services_list),
    ...getValuesByPrefix(source, 'service'),
  ];

  const seen = new Set();
  return raw.filter((item) => {
    if (seen.has(item)) {
      return false;
    }

    seen.add(item);
    return true;
  });
};

const buildContacts = (source = {}, normalizedPhone = '') => {
  const contacts = [];
  const seen = new Set();

  const pushContact = (contact) => {
    const content = toStringValue(contact?.content);
    if (!content) {
      return;
    }

    const label = toStringValue(contact?.label) || '•';
    const href = toStringValue(contact?.href);
    const scrollToId = toStringValue(contact?.scrollToId);

    const key = `${label}-${content}-${href}-${scrollToId}`;
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    contacts.push({
      label,
      content,
      href: href || undefined,
      isCopy: Boolean(contact?.isCopy),
      value: contact?.value ?? undefined,
      scrollToId: scrollToId || undefined,
    });
  };

  const phoneDisplay = toStringValue(source.phone);
  if (phoneDisplay) {
    pushContact({
      label: '📞',
      content: phoneDisplay,
      isCopy: true,
      value: normalizedPhone || phoneDisplay,
    });
  }

  const email = toStringValue(source.email);
  if (email) {
    pushContact({
      label: '✉️',
      content: email,
      href: `mailto:${email}`,
    });
  }

  const address = toStringValue(source.address);
  if (address) {
    pushContact({
      label: '📍',
      content: address,
      scrollToId: 'map',
    });
  }

  toList(source.contacts).forEach((content) => {
    pushContact({ label: '•', content });
  });

  return contacts;
};

const buildLinks = (source = {}, translate = (key) => key) => {
  const known = [
    source.instagram_url
      ? { label: translate('about.links.instagram'), href: toStringValue(source.instagram_url) }
      : null,
    source.facebook_url
      ? { label: translate('about.links.facebook'), href: toStringValue(source.facebook_url) }
      : null,
    source.telegram_channel_url
      ? { label: translate('about.links.telegramChannel'), href: toStringValue(source.telegram_channel_url) }
      : null,
    source.telegram_url
      ? { label: translate('about.links.telegram'), href: toStringValue(source.telegram_url) }
      : null,
    source.telegram_admin_url
      ? { label: translate('about.links.telegramAdmin'), href: toStringValue(source.telegram_admin_url) }
      : null,
    source.website_url
      ? { label: translate('about.links.website'), href: toStringValue(source.website_url) }
      : null,
  ];

  const additional = toList(source.links).map((entry) => {
    const href = toStringValue(entry);
    if (!href) {
      return null;
    }

    return { label: href, href };
  });

  const links = [];
  const seen = new Set();

  [...known, ...additional].forEach((link) => {
    if (!link) {
      return;
    }

    const href = toStringValue(link.href);
    if (!href || seen.has(href)) {
      return;
    }

    seen.add(href);
    links.push({
      label: toStringValue(link.label) || href,
      href,
    });
  });

  return links;
};

const mapStudioData = (data = {}, fallback = {}, { translate = (key) => key } = {}) => {
  const name = toStringValue(data.name) || toStringValue(fallback.name);
  const tagline = toStringValue(data.tagline) || toStringValue(fallback.tagline);
  const address = toStringValue(data.address);
  const phone = toStringValue(data.phone);
  const email = toStringValue(data.email) || toStringValue(fallback.email);
  const normalizedPhone = normalizePhoneNumber(phone);

  return {
    name,
    tagline,
    address,
    phone,
    normalizedPhone,
    features: (() => {
      const primary = buildFeatureList(data);
      if (primary.length) {
        return primary;
      }

      return buildFeatureList(fallback);
    })(),
    services: (() => {
      const primary = buildServices(data);
      if (primary.length) {
        return primary;
      }

      return buildServices(fallback);
    })(),
    contacts: (() => {
      const primary = buildContacts(
        {
          phone,
          email,
          address,
          contacts: data.contacts,
        },
        normalizedPhone,
      );

      if (primary.length) {
        return primary;
      }

      return buildContacts(
        {
          phone,
          email,
          address,
          contacts: fallback.contacts,
        },
        normalizedPhone,
      );
    })(),
    links: (() => {
      const primary = buildLinks(data, translate);
      if (primary.length) {
        return primary;
      }

      return buildLinks(fallback, translate);
    })(),
    bookingUrl: pickFirstUrl(
      data.booking_url,
      data.telegram_booking_url,
      data.telegram_admin_url,
      data.telegram_url,
      fallback.booking_url,
      fallback.telegram_booking_url,
      fallback.telegram_admin_url,
      fallback.telegram_url,
    ),
  };
};

const resolveLocalizedValue = (value, { localeCode, defaultLocaleCode }) => {
  if (value == null) {
    return '';
  }

  if (typeof value === 'string') {
    return toStringValue(value);
  }

  if (typeof value === 'object') {
    if (value[localeCode] != null) {
      return toStringValue(value[localeCode]);
    }

    if (value[defaultLocaleCode] != null) {
      return toStringValue(value[defaultLocaleCode]);
    }
  }

  return toStringValue(value);
};

const buildFallbackStudio = (fallback = {}, { localeCode, defaultLocaleCode }) => {
  const resolve = (value) => resolveLocalizedValue(value, { localeCode, defaultLocaleCode });

  const features = (fallback.features ?? [])
    .map((item) => ({
      icon: toStringValue(item?.icon) || '•',
      text: resolve(item?.text),
    }))
    .filter((item) => item.text);

  const services = (fallback.services ?? [])
    .map((item) => resolve(item))
    .filter(Boolean);

  return {
    name: resolve(fallback.name),
    tagline: resolve(fallback.tagline),
    address: resolve(fallback.address),
    phone: resolve(fallback.phone),
    email: resolve(fallback.email),
    booking_url: resolve(fallback.bookingUrl ?? fallback.booking_url),
    telegram_url: resolve(fallback.telegramUrl ?? fallback.telegram_url),
    telegram_admin_url: resolve(fallback.telegramAdminUrl ?? fallback.telegram_admin_url),
    telegram_booking_url: resolve(fallback.telegramBookingUrl ?? fallback.telegram_booking_url),
    features,
    services,
    contacts: (fallback.contacts ?? []).map((item) => resolve(item)).filter(Boolean),
    links: (fallback.links ?? []).map((item) => resolve(item)).filter(Boolean),
  };
};

export {
  buildContacts,
  buildFallbackStudio,
  buildFeatureList,
  buildLinks,
  buildServices,
  getValuesByPrefix,
  mapStudioData,
  normalizePhoneNumber,
  resolveLocalizedValue,
  toList,
  toStringValue,
};
