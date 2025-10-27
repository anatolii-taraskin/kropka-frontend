export const staticContent = {
  main: {
    header: {
      navLinks: [
        { name: 'about', labelKey: 'navigation.about' },
        { name: 'pricing', labelKey: 'navigation.pricing' },
        { name: 'equipment', labelKey: 'navigation.equipment' },
        { name: 'teachers', labelKey: 'navigation.teachers' },
      ],
    },
    footer: {
      brandName: {
        ru: 'Kropka Music Studio',
        en: 'Kropka Music Studio',
        ka: 'Kropka Music Studio',
      },
      copyright: {
        ru: '© Kropka Studio, Батуми',
        en: '© Kropka Studio, Batumi',
        ka: '© Kropka Studio, ბათუმი',
      },
      map: {
        embedUrl: 'https://www.google.com/maps?q=Kropka+Music+Studio+Batumi&output=embed',
        searchUrl: 'https://www.google.com/maps/search/?api=1&query=Kropka+Music+Studio,+Batumi,+Georgia',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kropka+Music+Studio,+Batumi,+Georgia',
      },
    },
  },
  about: {
    heroImage: 'main_page/main_img.png',
    scheduleUrl:
      'https://calendar.google.com/calendar/u/0/embed?src=7qh5sinn2kdu1osa4r45icihck@group.calendar.google.com&ctz=Asia/Tbilisi&pli=1',
  },
  equipment: {
    fallbackImage: 'main_page/main_img.png',
  },
  apiTest: {
    endpoints: [
      {
        path: '/api/v1/studio',
        labelKey: 'apiTest.endpoints.studio.label',
        descriptionKey: 'apiTest.endpoints.studio.description',
      },
      {
        path: '/api/v1/prices',
        labelKey: 'apiTest.endpoints.prices.label',
        descriptionKey: 'apiTest.endpoints.prices.description',
      },
      {
        path: '/api/v1/equipment',
        labelKey: 'apiTest.endpoints.equipment.label',
        descriptionKey: 'apiTest.endpoints.equipment.description',
      },
      {
        path: '/api/v1/teachers',
        labelKey: 'apiTest.endpoints.teachers.label',
        descriptionKey: 'apiTest.endpoints.teachers.description',
      },
      {
        path: '/api/v1/rules',
        labelKey: 'apiTest.endpoints.rules.label',
        descriptionKey: 'apiTest.endpoints.rules.description',
      },
    ],
  },
};

export default staticContent;
