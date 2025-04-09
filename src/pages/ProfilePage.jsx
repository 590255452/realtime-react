import { useAuthStore } from "../store/useAuthStore";
import { User, Mail, Camera } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
    const { authUser, isUpdateProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    // TODO 选择用户上传的第一个文件，并将其转换为base64格式的字符串，然后将其设为selectedImg的值供页面显示，然后将其设为profilePic的值传递给updateProfile函数
    const handleImageUpload = async e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };
    // BUG 没有更新formdata
    // BUG 超级错误，从profile退出后，并没有跳转到login
    const formData = {};
    return (
        <div className=" pt-5 max-w-[800px] mx-auto h-full">
            <div className="flex flex-col gap-10 items-center p-10">
                {/* top */}
                <div className="flex flex-col items-center gap-10 p-6 rounded-lg bg-accent/10 w-full">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-2xl font-medium">Profile</h1>
                        <p className="opacity-70">Update your profile</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="avatar ">
                            <div className="w-24 rounded-full border-2 border-white bg-[#ADB6C5]">
                                <img src={selectedImg || authUser?.profilePic || "/user.png"} />
                            </div>
                            <label htmlFor="profilePic" className="btn btn-sm btn-circle btn-primary absolute bottom-0 right-0">
                                <Camera className="size-5 text-base-200" />
                                <input
                                    type="file"
                                    id="profilePic"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={isUpdateProfile}
                                    accept="image/*"
                                />
                            </label>
                        </div>
                        <p className="text-sm text-base-content">{isUpdateProfile ? "Uploading..." : "Click the camera icon to update your photo"}</p>
                    </div>

                    <fieldset className="space-y-6 w-full">
                        {/* FullName */}
                        <div>
                            <label className="fieldset-label font-medium mb-2">
                                <User className="size-5 text-base-content/40" />
                                <span>Full Name</span>
                            </label>
                            <label className="input w-full pl-6">
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={authUser?.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </label>
                        </div>
                        {/* Email */}
                        <div>
                            <label className="fieldset-label font-medium mb-2">
                                <Mail className="size-5 text-base-content/40" />
                                <span>Email</span>
                            </label>
                            <label className="input w-full pl-6">
                                <input
                                    type="text"
                                    placeholder="you@example.com"
                                    value={authUser?.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </label>
                        </div>
                    </fieldset>
                </div>
                {/* down */}
                <div className="flex flex-col gap-5 p-6 rounded-lg bg-accent/10 w-full">
                    <h1 className="text-xl font-bold">Account Information</h1>
                    <div className="flex justify-between border-b-2 pb-2">
                        <p className="text-base-content/60 text-md">Member Since</p>
                        <p className="text-base-content/60 text-md">{authUser?.createdAt?.split("T")[0]}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-base-content/60 text-md">Account Status</p>
                        {/* BUG 并没有isverifed */}
                        <p className="text-green-400 text-md">{authUser?.isVerified ? "Verified" : "Not Verified"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
