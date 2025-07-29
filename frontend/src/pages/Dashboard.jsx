import { useState } from "react";
import { Outlet, useNavigate, useLocation, matchPath } from "react-router-dom";
import AdminDashboardStats from "../Components/AdminDashBoardstats";
import ConfirmModal from "../Components/ConfirmModal";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutConfirm(false);
    navigate("/login", { replace: true });
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md flex flex-col justify-between transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="p-3 focus:outline-none w-full text-left border-b border-gray-200"
        >
          {sidebarOpen ? "⬅️ Collapse" : "➡️"}
        </button>

        <nav className="mt-4 flex flex-col gap-2">
          <SidebarItem
            icon="🏠"
            label="Dashboard"
            open={sidebarOpen}
            to="/dashboard"
            currentPath={location.pathname}
            navigate={navigate}
            exact={true}
          />
          <SidebarItem
            icon="✍️"
            label="Create Blog"
            open={sidebarOpen}
            to="/dashboard/create-blog"
            currentPath={location.pathname}
            navigate={navigate}
          />
          <SidebarItem
            icon="📚"
            label="All Blogs"
            open={sidebarOpen}
            to="/dashboard/show-blogs"
            currentPath={location.pathname}
            navigate={navigate}
          />
        </nav>

        <div className="mb-4">
          <nav>
            <SidebarItem
              icon="📚"
              label="Go to Website"
              open={sidebarOpen}
              to="/"
              currentPath={location.pathname}
              navigate={navigate}
            />
          </nav>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 p-3 w-full hover:bg-red-100 text-red-600 font-semibold"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto relative">
        {location.pathname === "/dashboard" && <AdminDashboardStats />}
        <Outlet />

        <ConfirmModal
          isOpen={showLogoutConfirm}
          title="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, open, to, currentPath, navigate, exact }) {
  const isActive = matchPath({ path: to, end: !!exact }, currentPath);

  return (
    <button
      className={`flex items-center gap-3 p-3 w-full rounded transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-600 font-semibold"
          : "hover:bg-gray-100 text-gray-700"
      }`}
      type="button"
      onClick={() => navigate(to)}
    >
      <span className="text-xl">{icon}</span>
      {open && <span>{label}</span>}
    </button>
  );
}
