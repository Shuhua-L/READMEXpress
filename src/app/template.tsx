import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className='drawer xl:drawer-open h-screen w-screen max-h-screen max-w-screen overflow-x-hidden md:overflow-hidden'>
      <input id='my-drawer-menu' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col h-full'>
        <NavBar />
        {/* Page content here */}
        {children}
      </div>
      <div className='drawer-side z-10'>
        <label htmlFor='my-drawer-menu' className='drawer-overlay'></label>
        <div className='menu p-4 w-80 h-full bg-base-200 text-base-content'>
          {/* Sidebar content here */}
          <SideBar />
        </div>
      </div>
    </main>
  );
}
