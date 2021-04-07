//@TODO improve this, maybe make configure-able
export const HTTP_API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://solo-web-monitor.herokuapp.com/api';
