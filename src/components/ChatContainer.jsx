import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const { authUser, onlineUsers } = useAuthStore();
    const { selectedUser, setSelectedUser, messages, getMessages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    const chatEndRef = useRef(null);
    const isInitialRender = useRef(true);
    const messageEndRef = useRef(null);

    useEffect(() => {
        isInitialRender.current = true;
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    // TODO 聊天区域滚动到最底部(smooth平滑滚动、auto立即滚动)
    useEffect(() => {
        if (isInitialRender.current) {
            if (messageEndRef.current && messages) messageEndRef.current?.scrollIntoView({ behavior: "auto" });
            isInitialRender.current = false;
        } else {
            if (messageEndRef.current && messages) messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    console.log(authUser);

    const MessagesLoading = () => {
        return (
            <div className="p-4 space-y-4 overflow-y-auto bg-base-100 flex-1">
                {[...Array(6)].map((_, i) => (
                    <div className={`chat space-y-1 ${i % 2 !== 0 ? "chat-end" : "chat-start"} `} key={i}>
                        <div className="chat-header bg-base-300 rounded-sm">
                            <p className="text-xs opacity-50">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        </div>
                        <div className="chat-bubble select-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="chat-image">
                            <div className="rounded-full overflow-hidden bg-base-300 size-12 flex items-center justify-center"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="size-full flex flex-col">
                {/* title */}
                <div className="flex justify-between items-center p-3 border-b border-base-300">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full overflow-hidden bg-base-100 size-10 flex items-center justify-center">
                            {selectedUser.profilePic ? (
                                <img src={selectedUser.profilePic} />
                            ) : (
                                <div>{selectedUser.fullName.charAt(0).toUpperCase()}</div>
                            )}
                        </div>
                        <div>
                            <p>{selectedUser.fullName}</p>
                            <div className="text-sm text-start text-zinc-400">{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</div>
                        </div>
                    </div>
                    <button className="p-2" onClick={() => setSelectedUser(null)}>
                        <X size={25} className="hover:text-primary" />
                    </button>
                </div>
                {/* main */}
                <div className="p-4 space-y-4 overflow-y-auto bg-base-100 flex-1">
                    {isMessagesLoading ? (
                        <MessagesLoading />
                    ) : (
                        messages.map(message => (
                            <div
                                className={`chat space-y-1 ${selectedUser._id === message.senderId ? "chat-start" : "chat-end"}`}
                                key={message._id}
                                ref={messageEndRef}>
                                <div className={`chat-header`}>
                                    <time className="text-xs opacity-50">{formatMessageTime(message.createdAt)}</time>
                                </div>
                                <div className="chat-bubble select-text">
                                    {message.image && <img src={message.image} className="sm:max-w-[200px] rounded-md mb-2" alt="Attachment" />}
                                    {message.text && <p>{message.text}</p>}
                                </div>
                                <div className="chat-image">
                                    <div className="rounded-full overflow-hidden bg-base-300 size-12 flex items-center justify-center">
                                        {selectedUser._id === message.senderId ? (
                                            selectedUser.profilePic ? (
                                                <img src={selectedUser.profilePic} />
                                            ) : (
                                                <div>{selectedUser.fullName.charAt(0).toUpperCase()}</div>
                                            )
                                        ) : authUser.profilePic ? (
                                            <img src={authUser.profilePic} />
                                        ) : (
                                            <div>{authUser.fullName.charAt(0).toUpperCase()}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={chatEndRef}></div>
                </div>

                {/* input */}
                <MessageInput />
            </div>
        </>
    );
};

export default ChatContainer;
