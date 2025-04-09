import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    console.log(onlineUsers);

    const { theme } = useThemeStore();

    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }
    // BUG 窗口的高度超出了一个navbar
    return (
        <div data-theme={theme}>
            <Navbar />
            <div className="relative pt-16 overflow-auto h-screen select-none bg-base-100">
                <Routes>
                    <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                    <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/setting" element={authUser ? <SettingPage /> : <Navigate to="/login" />} />
                </Routes>
            </div>
            <Toaster />
        </div>
    );
};

export default App;

// // pages/index.js
// export { HomePage } from "./HomePage";
// export { LoginPage } from "./LoginPage";
// import { HomePage, LoginPage } from "./pages";
