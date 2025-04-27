import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// 返回一个对象，当前认证用户 是否正在注册 是否正在登录 是否正在更新用户资料 是否正在检查认证 检查认证 是否第一次登录
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    hasTriedAuthCheck: false,
    checkAuth: async () => {
        try {
            const res = await axiosInstanace.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            if (get().hasTriedAuthCheck) {
                toast.error(error.response.data.message);
            }
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false, hasTriedAuthCheck: true });
        }
    },
    signup: async data => {
        set({ isSignUp: true });
        try {
            const res = await axiosInstanace.post("/auth/signup", data);
            toast.success("Account created successfully");
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSignUp: false });
        }
    },
    login: async data => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstanace.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstanace.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    updateProfile: async data => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstanace.put("/auth/update-profile", data);
            toast.success("Profile updated successfully");
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();
        set({ socket });
        socket.on("getOnlineUsers", userIds => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));
