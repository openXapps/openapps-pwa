export type TAppModulesRecord = {
  id: number
  moduleName: string
  moduleDesc: string
  url: string
  isActive: boolean
  order: number
}

export type TAppModules = TAppModulesRecord[]

export const appModules: TAppModules = [
  {
    id: 1,
    moduleName: "BookMARKER",
    moduleDesc: "Profile, categorize and bookmark your favorite sites. Your bookmarks will open in a new tab, keeping the BookMARKER open in its original tab. BookMARKER is rich in functionality, for example its got a powerful search option, allows you to manage categories in bulk, simple but effective backup option by exporting your data to a file and restore your data back from a file, perfect for offline backups. All your data is stored in the cloud, so you can access the same bookmarks from different devices and web browsers.",
    url: "bookmarker",
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    moduleName: "Movies",
    moduleDesc: "See information about all new and legacy movies. This movie information database is driven by The Movie Database (TMDb) API.",
    url: "movies",
    isActive: true,
    order: 2,
  },
  {
    id: 3,
    moduleName: "CryptoPASS",
    moduleDesc: "Manage and access your passwords securely form any device and web browser. CryptoPASS uses a strong and secure algorithm to encrypt and decrypt your password data, depending on the complexity of the passphrase you provide. There is no restriction what passphrase you can use, but its recommended to use something with many characters, words, phrases or full sentences. Passwords are unrecoverable without the passphrase. CryptoPASS allows you to generate strong passwords. There is also a simple but effective backup option by exporting your data to a file and restore your data back from a file, perfect for offline backup.",
    url: "cryptopass",
    isActive: true,
    order: 3,
  },
  {
    id: 4,
    moduleDesc: "Manage your shopping and to-do lists quickly and with ease. All your lists are store in the cloud, which allows you to access them from any device and web browser. New features are in the pipeline, for example to share your lists with friends and family.",
    moduleName: "MyLIST",
    url: "mylist",
    isActive: true,
    order: 4,
  },
  {
    id: 5,
    moduleName: "QuickNOTES",
    moduleDesc: "Write quick notes and save them to the cloud. You can access and manage your notes from any device and web browser. QuickNOTES is rich in functionality and still growing. There is a limit of 1 million characters per note which should be more than enough to store a respectable lengthy note.",
    url: "notes",
    isActive: true,
    order: 5,
  }
]