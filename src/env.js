
export const apiUrl = window.location.origin.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://atypik-house-api-y8ntq.ondigitalocean.app';

export const webUrl = window.location.origin.includes('localhost')
  ? 'http://localhost:8081'
  : 'https://atypik-house-api-y8ntq.ondigitalocean.app';
