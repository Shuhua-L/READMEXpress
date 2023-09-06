"use client";
import { useAppSelector, useAppDispatch } from "@/store";
import { toggleShowTOC, toggleShowBOT } from "@/store/documentSlice";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.document.settings);

  return (
    <div>
      <h3 className='text-center'>Current Document</h3>

      <label className='label cursor-pointer'>
        Include Table of Contents
        <input
          type='checkbox'
          checked={settings.showTOC}
          className='checkbox checkbox-accent'
          onChange={() => dispatch(toggleShowTOC())}
        />
      </label>

      <label className='label cursor-pointer'>
        Include Back to Top
        <input
          type='checkbox'
          checked={settings.showBOT}
          className='checkbox checkbox-accent'
          onChange={() => dispatch(toggleShowBOT())}
        />
      </label>
    </div>
  );
};

export default SideBar;
