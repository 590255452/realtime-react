import { useState, useRef } from "react";
import { X, Send, Image, Laugh } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [emo, setEmo] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();
    // TODO 获取文件，验证文件类型 创建FileReader对象 设置读取完成的回调函数 读取文件
    const handleImageChange = e => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const handleSendMessage = async e => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            });
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <>
            <div className="w-full bg-base-100 flex gap-2 border-t border-base-300 shadow-2xl">
                {imagePreview && (
                    <div className="relative m-2">
                        <img src={imagePreview} alt="Preview" className="size-20 object-cover border border-base-300 rounded-lg" />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300  flex items-center justify-center">
                            <X />
                        </button>
                    </div>
                )}
            </div>
            <form className="p-4 border-t border-base-300 bg-base-100 flex gap-2" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="input input-sm input-bordered flex-1 text-md sm:input-md"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button className="btn btn-square" type="button">
                    <Laugh size={15} />
                </button>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                <button
                    type="button"
                    className={`btn btn-square hidden sm:flex ${imagePreview ? "text-green-400" : ""}`}
                    onClick={() => fileInputRef.current?.click()}>
                    <Image size={15} />
                </button>

                <button type="submit" className="btn btn-square" disabled={!text.trim() && !imagePreview}>
                    <Send size={15} />
                </button>
            </form>
        </>
    );
};

export default MessageInput;
