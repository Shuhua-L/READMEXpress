import { useEffect } from "react";
import { useForm } from "react-hook-form";

import getLiteral from "./Literals";
import { SaveButton, TextArea } from "./MyComponents";
import type { TSectionProps, TBasicLiteral } from "@/types";

import { useAppSelector, useAppDispatch } from "@/store";
import { updateContent, sectionTemplateSelector } from "@/store/features/documentSlice";

const About = ({ section }: TSectionProps) => {
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) => sectionTemplateSelector(state, section));

  const { handleSubmit, register, reset } = useForm<TBasicLiteral>({
    defaultValues: template?.default,
    mode: "onChange",
  });
  const onSubmit = (data: TBasicLiteral) => {
    data["title"] = template?.title;
    let literal = getLiteral({ section, props: data });
    dispatch(updateContent({ sec: section, doc: literal }));
  };

  useEffect(() => {
    reset(template?.default);
  }, [template?.default, reset]);

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>{template?.title}</div>
      <div className='collapse-content bg-neutral-content'>
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
      </div>
    </div>
  );
};

export default About;
