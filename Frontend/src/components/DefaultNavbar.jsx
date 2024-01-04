import React from 'react'
import { Navbar, Button } from 'flowbite-react'
//import app.css
import '../App.css'


function DefaultNavbar() {
    return (
      <Navbar
        className='bg-customNavbar' // alkalmazza az egyéni színosztályt
      >
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            WordEnlighten
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 mx-6">
          <Button color="light" className='mr-6'>
            Log in
          </Button>
          <Button color="dark">
            Sign up
          </Button>
        </div>

      </Navbar>
    );
  }
  
  export default DefaultNavbar;