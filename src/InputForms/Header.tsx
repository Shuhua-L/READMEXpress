import { useForm, SubmitHandler } from "react-hook-form";
import { HeaderTemplate } from "./Literals";
import { Input, SaveButton } from "./MyComponents";

type THeaderTemplate = {
  githubHandler: string;
  repository: string;
  projectTitle: string;
  catchPhrase: string;
  logoURL: string;
};

type Props = {
  updateDocument: (doc: string) => void;
};

const Header = (props: Props) => {
  const { register, handleSubmit } = useForm<THeaderTemplate>({
    defaultValues: {
      githubHandler: "Shuhua-L",
      repository: "READMEXpress",
      projectTitle: "READMEXpress",
      catchPhrase: "An awesome README generator",
    },
  });
  const onSubmit: SubmitHandler<THeaderTemplate> = (data) => {
    let literal = HeaderTemplate(data);
    // console.log(literal);
    props.updateDocument(literal);
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>(Start Here)</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          <Input
            {...register("githubHandler", { required: true, maxLength: 50 })}
            name='githubHandler'
            label='Github Username'
            placeholder='Github Username'
            required={true}
          />
          <Input
            {...register("repository", { required: true })}
            name='repository'
            label='Repository Name'
            placeholder='Repository Name'
            required={true}
          />

          <Input
            {...register("projectTitle", { required: true })}
            name='projectTitle'
            label='Project Title'
            placeholder='Project Title'
            required={true}
          />

          <Input
            {...register("catchPhrase")}
            name='catchPhrase'
            label='Catch Phrase or Short Description'
            placeholder='Catch phrase or description (optional)'
            required={false}
          />

          <Input
            {...register("logoURL")}
            name='logoURL'
            label='Project Logo'
            placeholder='Enter an image url (optional)'
            required={false}
          />

          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default Header;
