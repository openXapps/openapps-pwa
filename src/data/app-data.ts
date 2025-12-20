export type AppObject = {
  title: string;
  description: string;
  url: string;
}

export const appList: AppObject[] = [
  {
    title: 'Movies DATABASE',
    description: 'Brows through all the latest movies, and much more.',
    url: 'apps/movies/'
  }, {
    title: 'Quick NOTES',
    description: 'Make quick notes and save them to your device.',
    url: 'apps/notes'
  }, {
    title: 'Book MARKER',
    description: 'Bookmark your favourite sites and save them to your device.',
    url: 'apps/bookmarker'
  }, {
    title: 'Crypto PASS',
    description: 'Manage your passwords securely and save them to your device.',
    url: 'apps/cryptopass'
  }, {
    title: 'My LIST',
    description: 'Manage shopping and/or to-do lists quick and easy. Save them to your device.',
    url: 'apps/mylist'
  }
];