"use client";
import { useAppSelector, useAppDispatch } from "@/store";
import { toggleShowTOC, toggleShowBOT } from "@/store/documentSlice";
import { MovableList } from "./MovableList/SortableList";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.document.settings);

  return (
    <div>
      <h3 className='text-lg text-center p-2'>Current Document</h3>

      <label className='label cursor-pointer text-sm'>
        Include Table of Contents
        <input
          type='checkbox'
          checked={settings.showTOC}
          className='checkbox checkbox-accent'
          onChange={() => dispatch(toggleShowTOC())}
        />
      </label>

      <label className='label cursor-pointer text-sm'>
        Include Back to Top
        <input
          type='checkbox'
          checked={settings.showBOT}
          className='checkbox checkbox-accent'
          onChange={() => dispatch(toggleShowBOT())}
        />
      </label>

      <h3 className='text-lg text-center mt-6 p-2'>Modules</h3>
      <MovableList />
    </div>
  );
};

export default SideBar;
