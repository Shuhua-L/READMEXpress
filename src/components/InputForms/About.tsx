import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { SaveButton, TextArea } from "../FormComponents/MyComponents";
import type { TSectionProps, TBasicLiteral } from "@/types";

import { useAppSelector, useAppDispatch } from "@/store";
import { updateContent, sectionTemplateSelector } from "@/store/documentSlice";
import CollapseForm from "../FormComponents/CollapseForm";

const About = ({ section }: TSectionProps) => {
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) => sectionTemplateSelector(state, section));

  const { handleSubmit, register, reset } = useForm<TBasicLiteral>({
    defaultValues: template?.default,
    mode: "onChange",
  });
  const onSubmit = (data: TBasicLiteral) => {
    data["title"] = template?.title;
    dispatch(updateContent({ section, formData: data }));
  };

  useEffect(() => {
    reset(template?.default);
  }, [template?.default, reset]);

  return (
    <CollapseForm title={template?.title}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
        <TextArea
          {...register("description")}
          name='description'
          label='Description'
          required={false}
          placeholder='Write about 1-2 paragraphs describing the purpose of your project.'
        />
        <SaveButton />
      </form>
    </CollapseForm>
  );
};

export default About;
