import axios from 'axios';

axios.defaults.baseURL = "https://recruitment-test.ants.house/jsonrpc2/whawhai/v1";

axios.defaults.headers.post['Content-Type'] = 'application/json';