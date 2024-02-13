import React, { useState } from "react";
import { Navbar, Button } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";

function DefaultNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <Navbar className="bg-navbarBgColor">
      {isLoggedIn ? (
        <>
          <div className="hidden md:flex">
            <Link
              to="/dashboard"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Dashboard
            </Link>
            <Link
              to="/decks"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Decks
            </Link>
            <Link
              to="/submit-word"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Add word
            </Link>
            <Link
              to="/due-cards"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Due cards
            </Link>
            <Link
              to="/statistics"
              className="my-2 mx-5 font-medium text-white hover:text-importantText"
            >
              Statistics
            </Link>
          </div>

          <div className="md:hidden">
            <button
              className="text-white font-medium hover:text-importantText"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Menu
            </button>
            {showDropdown && (
              <div className="flex flex-col items-start">
                <Link
                  to="/dashboard"
                  className="my-2 font-medium text-white hover:text-importantText"
                >
                  Dashboard
                </Link>
                <Link
                  to="/decks"
                  className="my-2 font-medium text-white hover:text-importantText"
                >
                  Decks
                </Link>
                <Link
                  to="/submit-word"
                  className="my-2 font-medium text-white hover:text-importantText"
                >
                  Add word
                </Link>
                <Link
                  to="/due-cards"
                  className="my-2 font-medium text-white hover:text-importantText"
                >
                  Due cards
                </Link>
                <Link
                  to="/statistics"
                  className="my-2 font-medium text-white hover:text-importantText"
                >
                  Statistics
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/">
            <Button
              className="bg-importantText hover:bg-[#564260]"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </NavLink>
        </>
      ) : (
        <>
          <div className="flex justify-between w-full">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-importantText">
                WordEnlighten
              </span>
            </Navbar.Brand>
            <div className="flex md:order-2 mx-6">
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
            </div>
          </div>
        </>
      )}
    </Navbar>
  );
}

export default DefaultNavbar;
