import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useBlogs } from "../hooks/useBloges";

export default function AdminDashboardStats() {
  const { data: blogs, isLoading } = useBlogs();
  const [stats, setStats] = useState(null);

  // Color palette for category chart
  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#6366f1",
    "#e11d48",
    "#0ea5e9",
    "#a855f7",
  ];

  // Prepare chart data for categories (after stats is available)
  const categoryChartData = stats?.categoryCount
    ? Object.entries(stats.categoryCount).map(([label, count], index) => ({
        label,
        count,
        fill: COLORS[index % COLORS.length],
      }))
    : [];

  //Set dashboard stats (admin + blog count + dynamic category count)
  useEffect(() => {
    if (!isLoading && blogs) {
      const categoryCount = blogs.reduce((acc, blog) => {
        const category = blog.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      const res = {
        admin: {
          name: "admin",
          email: "admin@example.com",
        },
        blogsCount: blogs.length,
        categoriesCount: Object.keys(categoryCount).length,
        categoryCount,
      };

      setStats(res);
    }
  }, [blogs, isLoading]);

  if (isLoading || !stats) return <p>Loading...</p>;

  const summaryChartData = [
    { label: "Blogs", count: stats.blogsCount },
    { label: "Categories", count: stats.categoriesCount },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard Summary</h2>

      <div className="mb-6">
        <p className="text-lg">
          👤 Admin: <strong>{stats.admin.name}</strong>
        </p>
        <p className="text-lg">
          📧 Email: <strong>{stats.admin.email}</strong>
        </p>
      </div>

      {/* Summary chart: total blogs and categories */}
      <h3 className="text-lg font-semibold mb-2">Blog & Category Count</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={summaryChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Category-wise blog count chart */}
      <h3 className="text-lg font-semibold mt-10 mb-2">Blogs per Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" radius={[10, 10, 0, 0]}>
            {categoryChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
