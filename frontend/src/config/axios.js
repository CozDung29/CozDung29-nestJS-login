import axios from 'axios';

// Đặt URL của API backend, giả sử backend chạy trên http://localhost:3000
axios.defaults.baseURL = 'http://localhost:3000';

export default axios;
