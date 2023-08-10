import NavBar from "@/components/NavBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className='drawer xl:drawer-open h-screen w-screen max-h-screen max-w-screen overflow-x-hidden md:overflow-hidden'>
      <input id='my-drawer-menu' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col h-full'>
        {/* Page content here */}
        <NavBar />
        {children}
      </div>
      <div className='drawer-side z-10'>
        <label htmlFor='my-drawer-menu' className='drawer-overlay'></label>
        <div className='menu p-4 w-80 h-full bg-base-200 text-base-content'>
          <ul className='prose'>
            {/* Sidebar content here */}
            <h3 className='text-center'>Current Document</h3>
            <li>
              <a>Setting 1</a>
            </li>
            <li>
              <a>Setting 2</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
