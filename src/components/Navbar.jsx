"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, selectCurrentUser, clearUser } from "@/redux/features/api/authSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/');
  };

  const guestNavItems = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Login",
      url: "/login",
    },
    {
      name: "Registration",
      url: "/signup",
    },
  ];

  const authenticatedNavItems = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Dashboard",
      url: "/dashboard",
    },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : guestNavItems;

  return (
    <div>
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.url 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:block">Welcome,</span>
              <span className="text-sm font-medium text-gray-900 hidden sm:block">{user?.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hidden sm:block">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
