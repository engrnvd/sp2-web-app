export const defaultBlock = (data = {}) => ({
  name: 'Block name',
  color: '#03a9f4',
  ...data,
})

export const defaultPage = (data = {}) => ({
  name: 'Page name',
  color: '#00b3a1',
  link: '',
  isRoot: false,
  blocks: [],
  ...data,
})

export const newSitemapTemplate = () => ({
  name: 'Untitled Sitemap',
  tree: [
    defaultPage({
      name: 'Home',
      isRoot: true,
      blocks: [
        defaultBlock({ name: 'Header' }),
        defaultBlock({ name: 'Hero Section' }),
        defaultBlock({ name: 'Testimonials' }),
        defaultBlock({ name: 'Features' }),
        defaultBlock({ name: 'FAQs' }),
        defaultBlock({ name: 'Footer' }),
      ],
      children: [
        defaultPage({ name: 'Page 1', color: '#03a9f4' }),
        defaultPage({ name: 'Page 2' }),
        defaultPage({ name: 'Page 3', color: '#03a9f4' }),
        defaultPage({ name: 'Page 4' }),
      ],
    }),
  ]
})

