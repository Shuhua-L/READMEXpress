import { useForm, SubmitHandler } from "react-hook-form";

import getLiteral from "./Literals";
import { Input, SaveButton } from "./MyComponents";
import template from "@/data/template";
import type { TSectionProps, THeaderTemplate } from "@/types";

const Header = ({ section, updateContent }: TSectionProps) => {
  const { register, handleSubmit } = useForm<THeaderTemplate>({
    defaultValues: template[section].default,
  });
  const onSubmit: SubmitHandler<THeaderTemplate> = (data) => {
    let literal = getLiteral({ section, props: data });
    updateContent(literal, section);
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>(Start Here)</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          <Input
            {...register("githubUser", { required: true, maxLength: 50 })}
            name='githubUser'
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
