import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { login, isLogggingIn } = useAuthStore();
    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(formData.email)) return toast.error("Invalid email");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true;
    };
    const handleSubmit = e => {
        e.preventDefault();
        const valid = validateForm();
        if (valid) login(formData);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                            <p className="text-base-content/60">Sign in to your account</p>
                        </div>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <fieldset className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="fieldset-label font-medium mb-2">Email</label>
                                <label className="input w-full">
                                    <span className="label !border-r-0">
                                        <Mail className="size-5 text-base-content/40" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </label>
                            </div>

                            {/* Password  */}
                            <div>
                                <label className="fieldset-label font-medium mb-2">Password</label>
                                <label className="input w-full">
                                    <span className="label !border-r-0">
                                        <Lock className="size-5 text-base-content/40" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="······"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <EyeOff className="size-5 text-base-content/40" />
                                        ) : (
                                            <Eye className="size-5 text-base-content/40" />
                                        )}
                                    </button>
                                </label>
                            </div>
                            {/* Submit */}
                            <button type="submit" className="btn btn-primary w-full" disabled={isLogggingIn}>
                                {isLogggingIn ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        "Loading..."
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </fieldset>
                    </form>
                    {/* Link */}
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don't have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* Right */}
            <AuthImagePattern title="Welcome back" subtitle="Sign in to continue your conversations add catch up with your messages." />
        </div>
    );
};

export default LoginPage;
