import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  projectTitle: string;
  catchPhrase: string;
  logoURL: string;
}
const Header = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      {/* <input type='radio' name='current-document' /> */}
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>Header</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
          <input
            {...register("projectTitle", { required: true, maxLength: 50 })}
            placeholder='Project Title'
            className='input w-full '
          />
          <input
            {...register("catchPhrase")}
            placeholder='Catch phrase or description (optional)'
            className='input w-full '
          />
          <input
            {...register("logoURL")}
            placeholder='Enter an image url (optional)'
            className='input w-full '
          />
          <button type='submit' className='btn btn-wide mx-auto'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
