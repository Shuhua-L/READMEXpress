import Header from "@/components/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-col h-screen'>
      <Header />
      {children}
    </main>
  );
}
