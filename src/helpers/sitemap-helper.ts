export const defaultBlock = (data = {}) => ({
  name: 'Block name',
  color: '#03a9f4',
  ...data,
})

export const defaultPage = (data = {}) => ({
  name: 'Page name',
  color: '#00b3a1',
  link: '',
  blocks: [],
  ...data,
})

export const newSitemapTemplate = (data: any = {}) => ({
  name: data.name || 'Untitled Sitemap',
  pages: data.pages || {
    1: defaultPage({
      id: 1,
      name: 'Home',
      blocks: [
        defaultBlock({ name: 'Header' }),
        defaultBlock({ name: 'Hero Section' }),
        defaultBlock({ name: 'Testimonials' }),
        defaultBlock({ name: 'Features' }),
        defaultBlock({ name: 'FAQs' }),
        defaultBlock({ name: 'Footer' }),
      ],
      childIds: [2, 3, 4, 5],
    }),
    2: defaultPage({ id: 2, parent_id: 1, name: 'Page 1', color: '#03a9f4' }),
    3: defaultPage({ id: 3, parent_id: 1, name: 'Page 2' }),
    4: defaultPage({ id: 4, parent_id: 1, name: 'Page 3', color: '#03a9f4' }),
    5: defaultPage({ id: 5, parent_id: 1, name: 'Page 4' }),
  },
  sections: data.sections || [],
})

