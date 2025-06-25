const isClient = typeof window !== 'undefined';

export const apiUrl = isClient && window.location.origin.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://jellyfish-app-v4zg9.ondigitalocean.app';

export const webUrl = isClient && window.location.origin.includes('localhost')
  ? 'http://localhost:8081'
  : 'https://f2i-dev06-mz-ak-yy-ae.fr';
