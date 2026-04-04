import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ImageUpload from "../../components/Shared/ImageUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Editor styling
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";

const BlogEditor = () => {
  const [formData, setFormData] = useState({ title: "", category: "Technology", content: "", coverImg: "" });
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color"],
      ["clean"],
    ],
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if(!formData.coverImg) return alert("Cover Image is Mandatory.");
    
    try {
      await addDoc(collection(db, "blogs"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      navigate("/admin/blogs");
    } catch (err) {
      alert("Publishing Failed.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        <button onClick={() => navigate(-1)} className="text-zinc-600 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={16}/> Back</button>
        
        <h2 className="text-4xl font-black uppercase tracking-tighter">Draft <span className="text-[#00a63e]">Intelligence</span></h2>

        <form onSubmit={handlePublish} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cover Media</label>
              <ImageUpload onUploadSuccess={(url) => setFormData({...formData, coverImg: url})} folder="blogs" />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Post Title</label>
                <input type="text" required placeholder="The Future of Web3..." className="w-full bg-zinc-950 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold"
                  onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</label>
                <select className="w-full bg-zinc-950 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold appearance-none"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Development">Development</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Content Body</label>
            <div className="bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden">
              <ReactQuill 
                theme="snow" 
                value={formData.content} 
                onChange={(content) => setFormData({...formData, content})}
                modules={modules}
                className="text-white border-none"
              />
            </div>
          </div>

          <button type="submit" className="bg-[#00a63e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white hover:text-black transition-all">
            Publish Post <Send size={16}/>
          </button>
        </form>
      </div>
      
      {/* Quill Editor Custom Styling for Dark Theme */}
      <style>{`
        .ql-toolbar.ql-snow { border: none !important; background: #111; padding: 15px; border-bottom: 1px solid #222 !important; }
        .ql-container.ql-snow { border: none !important; min-height: 300px; font-size: 16px; font-family: inherit; }
        .ql-editor.ql-blank::before { color: #444 !important; font-style: normal; }
        .ql-snow .ql-stroke { stroke: #666 !important; }
        .ql-snow .ql-fill { fill: #666 !important; }
        .ql-snow .ql-picker { color: #666 !important; }
      `}</style>
    </AdminLayout>
  );
};

export default BlogEditor;