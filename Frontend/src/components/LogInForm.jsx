import React from "react";
import { Link } from "react-router-dom";

function LogInForm() {
  return (
    <div>
      <section className="bg-customNavbar">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-customNavbarText"
          >
            <h1>WordEnlighten</h1>
          </Link>
          <div className="w-full bg-[#B8E6C1] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg block w-full p-2.5"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-black">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-customNavbar   active:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-black">
                  Don’t have an account yet?{" "}
                  <Link to="/signup" className="font-medium hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LogInForm;
