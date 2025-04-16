import axios from "axios";

// TODO 创建axios实例，基本路径 跨域请求携带cookie。precess.env用于nodejs后端，import.meta.env用于vite前端框架
export const axiosInstanace = axios.create({
    // baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://realtime-express-production.up.railway.app/api",
    baseURL: "/api",
    withCredentials: true
});
