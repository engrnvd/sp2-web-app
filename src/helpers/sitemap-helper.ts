export const sitemapConfig = {
  root: {
    top: 50, // root page top
    left: 50
  },
  page: {
    gap: 40, // gap bw tw pages
    borderWidth: 2,
  },
  block: {
    gap: 4, // gap bw two blocks
  },
  connection: {
    offsetX: 40
  }
}

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
  tree: data.tree || [
    defaultPage({
      name: 'Home',
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
  ],
  sections: data.sections || [
    {
      name: 'Section: Links',
      children: [
        defaultPage({ name: 'Privacy Policy' }),
        defaultPage({ name: 'Terms of Service' }),
        defaultPage({ name: '404' }),
      ]
    }
  ],
})

