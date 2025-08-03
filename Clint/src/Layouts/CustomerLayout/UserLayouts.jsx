import React from "react";
import {
  Menu,
  LayoutDashboard,
  PackagePlus,
  ClipboardList,
  MapPin,
} from "lucide-react";
import { Link, Outlet } from "react-router";

const UserLayouts = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="customer-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar border-b-2 border-base-100 ">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="customer-drawer"
              className="btn btn-square btn-ghost"
            >
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">
            Customer Dashboard
          </div>
        </div>

        <main className="flex-grow p-6">
          <Outlet />
        </main>

        <footer className="text-center py-4">
          <p>© 2025 ProFast. All rights reserved.</p>
        </footer>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="customer-drawer"
          className="drawer-overlay lg:hidden"
        ></label>
        <aside className="menu p-4 max-w-72 bg-base-200 text-base-content min-h-screen space-y-2">
          <h2 className="text-xl font-bold mb-4">Customer Menu</h2>

          <li>
            <Link className="flex items-center gap-2">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/user/dashboard/customer/book-parcel"
              className="flex items-center gap-2"
            >
              <PackagePlus size={18} /> Book Parcel
            </Link>
          </li>
          <li>
            <Link
              to="/user/dashboard/customer/my-bookings"
              className="flex items-center gap-2"
            >
              <ClipboardList size={18} /> My Bookings
            </Link>
          </li>
          <li>
            <Link to="/customer/track/123" className="flex items-center gap-2">
              <MapPin size={18} /> Track Parcel
            </Link>
          </li>
        </aside>
      </div>
    </div>
  );
};

export default UserLayouts;
