import { useChatStore } from "../store/useChatStore";
import { MessageSquare } from "lucide-react";
import { useEffect } from "react";
import SideBar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
    const { selectedUser, users, getUsers } = useChatStore();

    return (
        <>
            <div className="h-full max-w-6xl mx-auto py-10 px-5">
                <div className="rounded-md shadow-md bg-base-200 flex overflow-hidden h-full">
                    <SideBar />
                    {/* Message */}
                    {selectedUser ? (
                        <ChatContainer />
                    ) : (
                        <div className="flex flex-col justify-center items-center w-full gap-4">
                            <div className="flex items-center justify-center size-15 bg-primary/10 rounded-lg animate-bounce">
                                <MessageSquare className="size-8 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold">Welcome to Chatty!</h1>
                            <p className="text-sm">Select a conversation from the sidebar to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomePage;
