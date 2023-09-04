import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input, SaveButton } from "../FormComponents/MyComponents";
import type { TSectionProps, THeaderTemplate } from "@/types";

import { useAppSelector, useAppDispatch } from "@/store";
import { updateContent, sectionTemplateSelector } from "@/store/documentSlice";
import CollapseForm from "../FormComponents/CollapseForm";

const Header = ({ section }: TSectionProps) => {
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) => sectionTemplateSelector(state, section));

  const { register, handleSubmit, reset } = useForm<THeaderTemplate>({
    defaultValues: template?.default,
  });
  const onSubmit: SubmitHandler<THeaderTemplate> = (data) => {
    dispatch(updateContent({ section, formData: data }));
  };

  useEffect(() => {
    reset(template?.default);
  }, [template?.default, reset]);

  return (
    <CollapseForm title='(Start Here)'>
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
    </CollapseForm>
  );
};

export default Header;
