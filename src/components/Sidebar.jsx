import { UsersRound } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
    const { users, getUsers, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

    if (isUserLoading)
        return <div className="w-32 lg:w-72 flex justify-center items-center border-r border-base-300 transition-all duration-200">正在加载...</div>;
    return (
        <div className="w-32 lg:w-72 flex flex-col border-r border-base-300 transition-all duration-200">
            <div className="flex flex-col justify-center gap-3 border-b border-base-300 p-4 h-25">
                <div className="flex gap-2 items-center justify-center lg:justify-start">
                    <UsersRound size={25} />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                <label htmlFor="only" className="hidden lg:flex space-x-1.5 text-sm items-center">
                    <input type="checkbox" id="only" checked={showOnlineOnly} onChange={e => setShowOnlineOnly(e.target.checked)} />
                    <span className="truncate">Show online only</span>
                    <span className="hidden lg:block text-nowrap text-zinc-400">{`(${filteredUsers.length} online)`}</span>
                </label>
            </div>
            <div className="overflow-y-auto">
                {filteredUsers.map(user => (
                    <button
                        key={user._id}
                        className={`flex justify-center items-center lg:justify-start w-full p-3 gap-4 hover:bg-base-300 transition-colors 
                        ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                            `}
                        onClick={() => setSelectedUser(user)}>
                        <div className="relative size-15">
                            <div className="rounded-full overflow-hidden bg-base-100 size-full flex items-center justify-center">
                                {user.profilePic ? <img src={user.profilePic} /> : <div>{user.fullName.charAt(0).toUpperCase()}</div>}
                            </div>
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute right-0 bottom-0 size-3 bg-green-500 rounded-full ring-1 ring-zinc-900" />
                            )}
                        </div>
                        <div className="hidden lg:block">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-start text-zinc-400">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
                        </div>
                    </button>
                ))}
                {filteredUsers.length === 0 && <div className="text-center text-zinc-400 py-4">No online users</div>}
            </div>
        </div>
    );
};

export default Sidebar;
