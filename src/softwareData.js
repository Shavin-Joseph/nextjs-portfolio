// softwareData.js

export const software = [
  {
    id: 1,
    name: 'AC Service Tracker',
    slug: 'AC-Service-Tracker-v1', // This will be used in the URL
    description: 'Your complete solution for tracking air conditioner installations and service history. A NEW VERTION RELEASED. SO PLEASE DOWNLOAD IT.',
    version: '1.0.0',
    releaseDate: '2025-10-07',
    filePath: '', // Path to the file in the /public folder
    passwordKey: 'COOL_APP_PASSWORD', // The key for the password in .env.local
  },

  {
    id: 2,
    name: 'AC Service Tracker',
    slug: 'AC-Service-Tracker-v2', // This will be used in the URL
    description: 'A new page added named parts. The page is works with a mobile app and helpfull to track part removing process.',
    version: '1.0.1',
    releaseDate: '2025-11-16',
    filePath: '/software/app.zip', // Path to the file in the /public folder
    passwordKey: 'COOL_APP_PASSWORD', // The key for the password in .env.local
  },

];