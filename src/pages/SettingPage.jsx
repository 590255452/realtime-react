import { THEMES } from "../lib/constants";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const SettingPage = () => {
    const { theme, setTheme } = useThemeStore();
    const { authUser } = useAuthStore();
    const PREVIEW_MESSAGES = [
        {
            id: 1,
            content: "Hello",
            isSent: false
        },
        {
            id: 2,
            content: "Hi",
            isSent: true
        }
    ];
    return (
        <>
            <div className="h-full mx-auto px-4 pt-10 max-w-5xl space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {THEMES.map(t => (
                        <button
                            key={t}
                            className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === t ? "bg-base-200 border border-primary/50" : "hover:bg-base-200/80"}`}
                            onClick={() => setTheme(t)}>
                            <div className="grid grid-cols-4 gap-[1px] p-1 h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                                <div className="rounded bg-primary"></div>
                                <div className="rounded bg-secondary"></div>
                                <div className="rounded bg-accent"></div>
                                <div className="rounded bg-neutral"></div>
                            </div>
                            <span className="text-sm font-medium w-full text-center truncate">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                        </button>
                    ))}
                </div>
                <h2 className="text-lg font-semibold">Preview</h2>
                <div className="rounded-xl border border-base-300 overflow-hidden p-4 bg-base-200 shadow-lg">
                    <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden max-w-lg mx-auto">
                        {/* header */}
                        <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex items-center gap-3">
                            <div className="size-8 rounded-full bg-primary flex justify-center items-center text-primary-content font-medium">
                                {authUser.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">{authUser.fullName}</h3>
                                <p className="text-xs text-base-content/70">Online</p>
                            </div>
                        </div>
                        {/* message */}
                        <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto bg-base-100">
                            {PREVIEW_MESSAGES.map(message => (
                                <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[80%] rounded-xl p-3 shadow-sm ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}>
                                        <p className="text-sm">{message.content}</p>
                                        <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>
                                            12:00 PM
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* input */}
                        <div className="p-4 border-t border-base-300 bg-base-100 flex gap-2">
                            <input
                                type="text"
                                className="input input-bordered flex-1 text-sm "
                                placeholder="Type a message..."
                                value="This is a preview"
                                readOnly
                            />
                            <button className="btn btn-primary">
                                <Send size={10} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingPage;
