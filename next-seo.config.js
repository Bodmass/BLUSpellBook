const title = 'FFXIV Blue Mage Spellbook'
const description = 'Final Fantasy XIV Shadowbringers Blue Mage Spellbook. Updated for Patch 5.5 (13/04/2021)'
const url = 'https://azizarar.com/'
const images = [
  {
    url: 'https://blu.azizarar.com/images/blu-image-01.jpg',
    width: 800,
    height: 600,
    alt: 'BLU IMAGE',
  },
]
const tags = [
  'FFXIV, Final Fantasy, Final Fantasy XIV, XIV, Final Fantasy 14, 14, Shadowbringers, Blu, Blue Mage, Spell, Book, Spellbook',
]

module.exports = {
  title,
  description,
  canonical: url,
  openGraph: {
    title,
    description,
    url,
    images,
    site_name: title,
    type: 'website',
    locale: 'en_GB',
    tags,
  },
  twitter: {
    handle: '@bodmassad',
    site: '@bodmassad',
    cardType: 'summary_large_image',
  },
}
