import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const { signup, isSigningUp } = useAuthStore();
    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(formData.email)) return toast.error("Invalid email");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        console.log("bbbb");

        return true;
    };
    const handleSubmit = e => {
        e.preventDefault();
        const valid = validateForm();
        if (valid) signup(formData);
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
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <fieldset className="space-y-6">
                            {/* FullName */}
                            <div>
                                <label className="fieldset-label font-medium mb-2">Full Name</label>
                                <label className="input w-full">
                                    <span className="label !border-r-0">
                                        <User className="size-5 text-base-content/40" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </label>
                            </div>
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

                            {/* Confirm Password  */}
                            {/* Submit */}
                            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                                {isSigningUp ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        "Loading..."
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </fieldset>
                    </form>
                    {/* Link */}
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* Right */}
            <AuthImagePattern title="Josin our community" subtitle="Join us and unlock exclusive features" />
        </div>
    );
};

export default SignUpPage;

//  <form onSubmit={handleSubmit} className="space-y-6">
//      {/* FullName */}
//      <div className="form-control">
//          <label className="label">
//              <span className="label-text font-medium">Full Name</span>
//          </label>
//          <div className="relative">
//              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                  <User className="size-5 text-base-content/40" />
//              </div>
//              <input
//                  type="text"
//                  className="input input-bordered w-full pl-10"
//                  placeholder="John Doe"
//                  value={formData.fullName}
//                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
//              />
//          </div>
//      </div>
//      {/* Email */}
//      <div className="form-control">
//          <label className="label">
//              <span className="label-text font-medium">Email</span>
//          </label>
//          <div className="relative">
//              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                  <Mail className="size-5 text-base-content/40" />
//              </div>
//              <input
//                  type="email"
//                  className="input input-bordered w-full pl-10"
//                  placeholder="you@example.com"
//                  value={formData.email}
//                  onChange={e => setFormData({ ...formData, email: e.target.value })}
//              />
//          </div>
//      </div>
//      {/* Password  */}
//      <div className="form-control">
//          <label className="label">
//              <span className="label-text font-medium">Password</span>
//          </label>
//          <div className="relative">
//              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                  <Lock className="size-5 text-base-content/40" />
//              </div>
//              <input
//                  type={showPassword ? "text" : "password"}
//                  className="input input-bordered w-full pl-10"
//                  placeholder="······"
//                  value={formData.password}
//                  onChange={e => setFormData({ ...formData, password: e.target.value })}
//              />
//              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
//                  {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
//              </button>
//          </div>
//      </div>
//      {/* Confirm Password  */}
//      {/* Submit */}
//      <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
//          {isSigningUp ? (
//              <>
//                  <Loader2 className="size-5 animate-spin" />
//                  "Loading..."
//              </>
//          ) : (
//              "Create Account"
//          )}
//      </button>
//  </form>;
