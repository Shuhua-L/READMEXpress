import InputForms from "@/InputForms";

export default function Home() {
  return (
    <div className='px-4 gap-4 md:flex flex-auto'>
      <div className='bg-neutral-content w-4/5 mx-auto md:w-1/2 mb-4'>
        <InputForms />
      </div>
      <div className='bg-accent-focus w-4/5 mx-auto md:w-1/2 mb-4'>Preview</div>
    </div>
  );
}
