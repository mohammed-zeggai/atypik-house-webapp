
const apiUrl = window.location.origin.includes('localhost')
  ? 'http://localhost:8080'
  : 'http://159.223.2.119';

export default apiUrl;
