"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const pageUrls = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Profile",
    url: "/profile",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex items-center gap-4 py-10">
        {pageUrls.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            className={pathname === item.url ? "text-blue-500" : ""}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
