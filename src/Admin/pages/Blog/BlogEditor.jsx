import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import ImageUpload from "../../components/Shared/ImageUpload";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { Send, ArrowLeft, Loader2 } from "lucide-react";

const BlogEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safe extraction of editData
  const editData = location.state?.editData || null;

  const [formData, setFormData] = useState({ 
    title: "", 
    category: "Technology", 
    content: "", 
    coverImg: "",
    excerpt: "",
    author: "CodeWebX Team",
    readTime: "5 min read"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Agar hum Edit mode mein hain toh data populate karo
    if (editData) {
      setFormData({
        title: editData.title || "",
        category: editData.category || "Technology",
        content: editData.content || "",
        coverImg: editData.coverImg || "",
        excerpt: editData.excerpt || "",
        author: editData.author || "CodeWebX Team",
        readTime: editData.readTime || "5 min read"
      });
    }
  }, [editData]);

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
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      if (editData && editData.id) {
        // UPDATE Existing Blog
        await updateDoc(doc(db, "blogs", editData.id), payload);
      } else {
        // ADD New Blog
        await addDoc(collection(db, "blogs"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Publish Error:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8 pb-20 text-left">
        <button 
            onClick={() => navigate("/admin/blogs")} 
            className="text-zinc-600 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={16}/> Back to Editorial Logs
        </button>
        
        <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
          {editData ? "Update" : "Draft"} <span className="text-[#00a63e]">Intelligence</span>
        </h2>

        <form onSubmit={handlePublish} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cover Image Upload */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cover Media</label>
              <ImageUpload onUploadSuccess={(url) => setFormData({...formData, coverImg: url})} folder="blogs" />
              {formData.coverImg && (
                <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/10">
                    <img src={formData.coverImg} className="w-full h-full object-cover" alt="Preview" />
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Post Title</label>
                <input 
                    type="text" required value={formData.title} 
                    placeholder="The Future of Web3..." 
                    className="w-full bg-zinc-950 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold"
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</label>
                    <select 
                        value={formData.category} 
                        className="w-full bg-zinc-950 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold appearance-none"
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Technology">Technology</option>
                      <option value="Case Study">Case Study</option>
                      <option value="Design">Design</option>
                      <option value="Development">Development</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                  {/* Read Time */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Read Time</label>
                    <input 
                        type="text" value={formData.readTime} 
                        className="w-full bg-zinc-950 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold"
                        onChange={(e) => setFormData({...formData, readTime: e.target.value})} 
                    />
                  </div>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Short Excerpt (Summary)</label>
            <textarea 
                required value={formData.excerpt} 
                className="w-full bg-zinc-950 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#00a63e] text-white font-bold h-24 resize-none"
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
                placeholder="Brief summary for featured card..."
            />
          </div>

          {/* Content Body (Rich Text) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Content Body</label>
            <div className="bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden min-h-[300px]">
              <ReactQuill 
                theme="snow" 
                value={formData.content} 
                onChange={(content) => setFormData({...formData, content})}
                modules={modules}
                className="text-white border-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-[#00a63e] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white hover:text-black transition-all active:scale-95 shadow-xl shadow-[#00a63e]/10"
          >
            {loading ? <Loader2 className="animate-spin" /> : editData ? "Update Intelligence" : "Publish Post"} <Send size={16}/>
          </button>
        </form>
      </div>
      
      {/* Quill Editor Dark Styling */}
      <style>{`
        .ql-toolbar.ql-snow { border: none !important; background: #111; padding: 15px; border-bottom: 1px solid #222 !important; border-radius: 2rem 2rem 0 0; }
        .ql-container.ql-snow { border: none !important; min-height: 300px; font-size: 16px; font-family: inherit; }
        .ql-editor.ql-blank::before { color: #444 !important; font-style: normal; }
        .ql-snow .ql-stroke { stroke: #666 !important; }
        .ql-snow .ql-fill { fill: #666 !important; }
        .ql-snow .ql-picker { color: #666 !important; }
        .ql-editor { color: #e4e4e7 !important; padding: 20px !important; }
        .ql-snow .ql-tooltip { background-color: #111 !important; color: white !important; border: 1px solid #333 !important; }
      `}</style>
    </AdminLayout>
  );
};

export default BlogEditor;