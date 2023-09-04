"use client";
import { RiMoonClearLine, RiSunFill, RiSettings4Line, RiGithubFill } from "react-icons/ri";
import useDarkMode from "@/utils/useDarkMode";

const NavBar = () => {
  const [mode, toggleTheme] = useDarkMode();

  return (
    <div className='navbar  border-b-2'>
      <div className='navbar-start'>
        {/* Drawer Menu */}
        <label
          htmlFor='my-drawer-menu'
          className='btn btn-ghost btn-circle drawer-button 2xl:hidden'>
          <RiSettings4Line className='fill-current w-6 h-6' />
        </label>
      </div>
      <div className='navbar-center'>
        <span className='normal-case font-bold text-xl '>READMEXpress</span>
      </div>
      <div className='navbar-end'>
        <a
          className='btn btn-ghost btn-circle'
          href='https://github.com/Shuhua-L/READMEXpress'
          target='__blank'>
          <RiGithubFill className='fill-current w-6 h-6' />
        </a>
        <label
          className={`btn btn-ghost btn-circle swap swap-rotate
          ${mode === "dark" ? "swap-active" : ""}`}>
          <input type='checkbox' onClick={toggleTheme} />
          <RiSunFill className='swap-on fill-current w-6 h-6' />
          <RiMoonClearLine className='swap-off fill-current w-6 h-6' />
        </label>
      </div>
    </div>
  );
};

export default NavBar;
