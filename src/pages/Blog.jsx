import React, { useEffect } from "react";
import BlogHero from "../components/Blog/BlogHero";
import FeaturedPost from "../components/Blog/FeaturedPost";
import BlogGrid from "../components/Blog/BlogGrid";
import Newsletter from "../components/Blog/Newsletter";

const Blog = () => {
  // Page load hone par scroll top par le jane ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-black w-full overflow-hidden">
      <BlogHero />
      <FeaturedPost />
      <BlogGrid />
      <Newsletter />
    </div>
  );
};

export default Blog;