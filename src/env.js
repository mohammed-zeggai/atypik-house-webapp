
const apiUrl = window.location.origin.includes('localhost')
  ? 'http://localhost:8080'
  : 'http://159.223.2.119';

const webUrl = window.location.origin.includes('localhost')
  ? 'http://localhost:8081'
  : 'http://159.223.2.119';

export default apiUrl;
export default webURL;
