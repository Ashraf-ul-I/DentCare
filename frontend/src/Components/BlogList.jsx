import { useState } from "react";
import BlogCard from "./BlogCard";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter as FilterIcon,
  ArrowRight,
} from "lucide-react";
const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Better Oral Hygiene",
    category: "hygiene",
    excerpt: `Maintaining good oral hygiene is essential...`,
    date: "March 15, 2024",
    image:
      "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    title: "Understanding Root Canal Treatment",
    category: "rootcanal",
    excerpt: `Root canal treatment is one of the most common dental procedures...`,
    date: "March 10, 2024",
    image:
      "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    title: "Benefits of Regular Dental Checkups",
    category: "regular",
    excerpt: `Many people underestimate the importance of regular dental checkups...`,
    date: "March 5, 2024",
    image:
      "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    title: "The Link Between Oral Health and Heart Disease",
    category: "oral",
    excerpt: `Recent studies have shown a strong link between oral health and cardiovascular health...`,
    date: "February 28, 2024",
    image:
      "https://images.pexels.com/photos/5355694/pexels-photo-5355694.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    title: "How Diet Affects Your Teeth and Gums",
    category: "regular",
    excerpt: `Your diet plays a crucial role in maintaining healthy teeth and gums...`,
    date: "February 20, 2024",
    image:
      "https://images.pexels.com/photos/4270097/pexels-photo-4270097.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(blogPosts.map((p) => p.category))];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Recent Blogs
          </h2>
          <p className="text-xl text-gray-600">
            Stay informed with our latest dental health insights
          </p>
        </div>
        {/* Grid layout for blog cards */}
        <div className="flex justify-end py-4">
          <div className="inline-flex items-center space-x-2">
            <FilterIcon className="w-5 h-5 text-blue-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map through blogPosts data to render each BlogCard */}
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
