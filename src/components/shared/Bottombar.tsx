import { bottombarLinks } from "@/constants";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive && "bg-primary-500 w-1/4 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={26}
              height={26}
              className={` ${isActive && "invert-white"}`}
            />
            {isActive && (
              <p className="tiny-medium text-light-2">{link.label}</p>
            )}
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
