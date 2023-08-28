"use client";
import { useAppSelector, useAppDispatch } from "@/store";
import { toggleShowTOC, toggleShowBOT } from "@/store/documentSlice";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.document.settings);

  return (
    <div>
      <ul className='prose'>
        <h3 className='text-center'>Current Document</h3>
        <li>
          <label className='label cursor-pointer'>
            Include Table of Contents
            <input
              type='checkbox'
              defaultChecked={settings.showTOC}
              className='checkbox checkbox-accent'
              onClick={() => dispatch(toggleShowTOC())}
            />
          </label>
        </li>
        <li>
          <label className='label cursor-pointer'>
            Include Back to Top
            <input
              type='checkbox'
              defaultChecked={settings.showBOT}
              className='checkbox checkbox-accent'
              onClick={() => dispatch(toggleShowBOT())}
            />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
