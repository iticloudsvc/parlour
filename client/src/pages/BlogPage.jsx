import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  Calendar,
  User,
  Search,
  ArrowRight,
  BookOpen,
  Share2,
  X
} from 'lucide-react';
import CardTilt3D from '../components/3d/CardTilt3D';
import { api } from '../services/api';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [readingBlog, setReadingBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.getBlogs();
        if (res.success && res.blogs) {
          setBlogs(res.blogs);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', 'Skincare', 'Haircare', 'Wellness'];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = activeCategory === 'All' || b.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.snippet.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold mb-3 border border-pink-200 dark:border-pink-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>The Beauty & Aesthetic Journal</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            Beauty Wisdom & Skincare Secrets
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3">
            Evidence-backed dermatologist insights, pre-bridal prep timelines, and haircare secrets straight from our master stylists.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === c
                    ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Blog Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <CardTilt3D key={post.id} className="h-full">
              <div className="h-full flex flex-col justify-between rounded-3xl overflow-hidden glass-card shadow-xl border border-white/60 dark:border-pink-500/20 group hover:border-pink-400 transition-colors">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-pink-600 dark:text-pink-400 shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white line-clamp-2 group-hover:text-pink-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {post.snippet}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-6 h-6 rounded-full bg-pink-100 dark:bg-slate-800 text-pink-600 flex items-center justify-center font-bold text-[10px]">
                        {post.author.charAt(0)}
                      </div>
                      <span className="font-medium truncate max-w-[120px]">{post.author}</span>
                    </div>

                    <button
                      onClick={() => setReadingBlog(post)}
                      className="px-4 py-2 rounded-full bg-pink-50 dark:bg-slate-800 text-pink-600 dark:text-pink-400 font-bold text-xs hover:bg-pink-600 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>

        {/* Full Article Reading Modal */}
        {readingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#16162a] rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 dark:border-pink-500/30 flex flex-col">
              <div className="relative h-64 overflow-hidden flex-shrink-0">
                <img
                  src={readingBlog.image}
                  alt={readingBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <button
                  onClick={() => setReadingBlog(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300">
                    {readingBlog.category} • {readingBlog.readTime}
                  </span>
                  <h2 className="font-serif font-black text-2xl sm:text-3xl mt-1 leading-tight">
                    {readingBlog.title}
                  </h2>
                  <p className="text-xs text-pink-200 mt-1">
                    Written by {readingBlog.author} • Published on {readingBlog.date}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                <p className="font-serif italic text-base text-pink-700 dark:text-pink-300 border-l-4 border-pink-500 pl-4 py-1">
                  "{readingBlog.snippet}"
                </p>
                <p>{readingBlog.content}</p>
                <p>
                  At Glamour Beauty Studio Bangalore, every treatment protocol is designed to balance active biochemical nourishment with cellular preservation. Whether you visit us for a monthly de-tan hydra facial or full bridal couture preparation, our master estheticians formulate a personalized regimen suited specifically to your dermal profile.
                </p>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-xs space-y-2 mt-4">
                  <strong className="block text-amber-800 dark:text-amber-300 text-sm font-serif">
                    ✨ Master Aesthetician Recommendation:
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400">
                    Never combine high-percentage glycolic acid with prescription retinoids without professional patch testing. For deep recovery, pair your skincare with our 24K Gold Youth Radiance Serum.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-shrink-0 text-xs">
                <span className="text-slate-500">Share this beauty wisdom</span>
                <button
                  onClick={() => setReadingBlog(null)}
                  className="px-5 py-2 rounded-full bg-pink-600 text-white font-bold text-xs"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
