import React from "react";
import { Navbar, Button } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";

function DefaultNavbar() {
  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;
  return (
    <Navbar className="bg-navbarBgColor">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-importantText">
          WordEnlighten
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 mx-6">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Dashboard
            </Link>
            <Link
              to="/logout"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Log in
            </Link>

            <NavLink to="/signup">
              <Button className="bg-importantText hover:bg-[#564260]">
                Sign up
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default DefaultNavbar;
