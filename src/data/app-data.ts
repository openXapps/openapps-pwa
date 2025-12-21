export type AppObject = {
  title: string;
  description: string;
  url: string;
}

export const appList: AppObject[] = [
  {
    title: 'Movies DATABASE',
    description: 'Brows through all the latest movies, and much more.',
    url: '/movies'
  }, {
    title: 'Quick NOTES',
    description: 'Make quick notes and save them to your device.',
    url: '/notes'
  }, {
    title: 'Book MARKER',
    description: 'Bookmark your favourite sites and save them to your device.',
    url: '/bookmarker'
  }, {
    title: 'Crypto PASS',
    description: 'Manage your passwords securely and save them to your device.',
    url: '/cryptopass'
  }, {
    title: 'My LIST',
    description: 'Manage shopping and/or to-do lists quick and easy. Save them to your device.',
    url: '/mylist'
  }
];