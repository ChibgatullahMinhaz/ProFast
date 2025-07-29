import { Link, Outlet } from "react-router";
import {
  LayoutDashboard,
  PackageSearch,
  PackagePlus,
  Package,
  ClipboardList,
  Users,
  Truck,
  User,
  BarChart,
  TicketPercent,
  Settings,
  Menu,
  FileDown,
  MapPin,
  Globe,
} from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar border-b-2 border-base-100 ">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">Admin Dashboard</div>
        </div>

        <main className="flex-grow p-6">
          <Outlet />
        </main>

        <footer className="text-center py-4">
          <p>© 2025 FroFast. All rights reserved.</p>
        </footer>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay lg:hidden"
        ></label>
        <aside className="menu p-4 max-w-72 bg-base-200 text-base-content min-h-screen space-y-2">
          <h2 className="text-xl font-bold mb-4">Admin Menu</h2>

          {/* Dashboard */}
          <li>
            <Link to="/admin" className="flex items-center gap-2">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>

          {/* Parcel Management */}
          <div className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title font-medium flex items-center gap-2">
              <Package size={18} /> Parcels
            </div>
            <div className="collapse-content">
              <ul className="space-y-1">
                <li>
                  <Link to="/admin/parcels">
                    <PackageSearch size={16} /> All Parcels
                  </Link>
                </li>
                <li>
                  <Link to="/admin/parcels/create">
                    <PackagePlus size={16} /> Create Parcel
                  </Link>
                </li>
                <li>
                  <Link to="/admin/parcels/assign">
                    <Truck size={16} /> Assign Agent
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bookings */}
          <li>
            <Link to="/admin/bookings" className="flex items-center gap-2">
              <ClipboardList size={18} /> Bookings
            </Link>
          </li>

          {/* Delivery Agents */}
          <li>
            <Link to="/admin/agents" className="flex items-center gap-2">
              <Truck size={18} /> Delivery Agents
            </Link>
          </li>

          {/* Customers */}
          <li>
            <Link to="/admin/customers" className="flex items-center gap-2">
              <Users size={18} /> Customers
            </Link>
          </li>

          {/* Reports */}
          <li>
            <Link to="/admin/reports" className="flex items-center gap-2">
              <FileDown size={18} /> Reports (CSV/PDF)
            </Link>
          </li>

          {/* Geolocation Tracking */}
          <li>
            <Link to="/admin/tracking" className="flex items-center gap-2">
              <MapPin size={18} /> Live Tracking
            </Link>
          </li>

          {/* Analytics */}
          <li>
            <Link to="/admin/analytics" className="flex items-center gap-2">
              <BarChart size={18} /> Analytics
            </Link>
          </li>

          {/* Settings */}
          <div className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title font-medium flex items-center gap-2">
              <Settings size={18} /> Settings
            </div>
            <div className="collapse-content">
              <ul className="space-y-1">
                <li>
                  <Link to="/admin/settings/company">Company Info</Link>
                </li>
                <li>
                  <Link to="/admin/settings/payment">Payment Settings</Link>
                </li>
                <li>
                  <Link to="/admin/settings/language">
                    <Globe size={16} /> Language
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminLayout;
