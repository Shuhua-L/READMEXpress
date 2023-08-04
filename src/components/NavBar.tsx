import { GrSun } from "react-icons/gr";
import { RiMoonClearLine } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";

const NavBar = () => {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        {/* Drawer Menu */}
        <label
          htmlFor='my-drawer-menu'
          className='btn btn-ghost btn-circle drawer-button xl:hidden'>
          <VscSettings className='fill-current w-5 h-5' />
        </label>
      </div>
      <div className='navbar-center'>
        <a className='btn glass normal-case text-xl'>READMEXpress</a>
      </div>
      <div className='navbar-end'>
        <a
          className='btn btn-ghost btn-circle'
          href='https://github.com/Shuhua-L/READMEXpress'
          target='__blank'>
          <BsGithub className='fill-current w-5 h-5' />
        </a>
        <label className='btn btn-ghost btn-circle swap swap-rotate'>
          {/* this hidden checkbox controls the state */}
          <input type='checkbox' />
          <GrSun className='swap-on fill-current w-5 h-5' />
          <RiMoonClearLine className='swap-off fill-current w-5 h-5' />
        </label>
      </div>
    </div>
  );
};

export default NavBar;