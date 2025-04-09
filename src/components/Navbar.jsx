import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { MessageSquare, Settings, UserPen, LogOut } from "lucide-react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 backdrop-blur-lg z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all ">
                    <div className="flex items-center justify-center size-10 bg-primary/10 rounded-lg">
                        <MessageSquare className="size-5 text-primary " />
                    </div>
                    <p className="text-xl font-bold">Chatty</p>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/setting" className="flex items-center gap-2">
                        <Settings className="size-5" />
                        <span className="hidden sm:inline">Settings</span>
                    </Link>
                    {authUser && (
                        <>
                            <Link to="/profile" className="flex items-center gap-2">
                                <UserPen className="size-5" />
                                <span className="hidden sm:inline">Profile</span>
                            </Link>
                            <button className="flex items-center gap-2" onClick={logout}>
                                <LogOut className="size-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
