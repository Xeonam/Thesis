import React from 'react'
import { Navbar, Button } from 'flowbite-react'
import { NavLink } from 'react-router-dom' 
//import Link
//import app.css
import '../App.css'


function DefaultNavbar() {
    return (
      <Navbar
        className='bg-customNavbar'
      >
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-customNavbarText">
            WordEnlighten
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 mx-6">
            <a href="#_" class="my-2 mx-5 font-medium text-white hover:text-customNavbarText">Log in</a>
          <Button className='bg-customNavbarText hover:bg-[#564260]'>
            Sign up
          </Button>
        </div>

      </Navbar>
      
    );
  }
  
  export default DefaultNavbar;