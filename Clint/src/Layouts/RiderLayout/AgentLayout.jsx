import { Link, Outlet } from "react-router";
import { Menu, Truck, PackageSearch, MapPin, LayoutDashboard } from "lucide-react";

const AgentLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="agent-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar border-b-2 border-base-100 ">
          <div className="flex-none lg:hidden">
            <label htmlFor="agent-drawer" className="btn btn-square btn-ghost">
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">Delivery Agent Dashboard</div>
        </div>

        <main className="flex-grow p-6">
          <Outlet />
        </main>

        <footer className="text-center py-4">
          <p>© 2025 ProFast. All rights reserved.</p>
        </footer>
      </div>

      <div className="drawer-side">
        <label htmlFor="agent-drawer" className="drawer-overlay lg:hidden"></label>
        <aside className="menu p-4 max-w-72 bg-base-200 text-base-content min-h-screen space-y-2">
          <h2 className="text-xl font-bold mb-4">Agent Menu</h2>

          <li>
            <Link to="/agent" className="flex items-center gap-2">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/agent/assigned-parcels" className="flex items-center gap-2">
              <PackageSearch size={18} /> Assigned Parcels
            </Link>
          </li>
          <li>
            <Link to="/agent/route-map" className="flex items-center gap-2">
              <MapPin size={18} /> Optimized Route
            </Link>
          </li>
        </aside>
      </div>
    </div>
  );
};

export default AgentLayout;
