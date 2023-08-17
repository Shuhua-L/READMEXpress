import { useForm } from "react-hook-form";

import { BasicLiteral } from "./Literals";
import { SaveButton, TextArea } from "./MyComponents";
import template from "@/data/template";
import type { TSectionProps, TBasicLiteral } from "@/types";

const About = ({ section, updateContent }: TSectionProps) => {
  const { handleSubmit, register } = useForm<TBasicLiteral>({
    defaultValues: template[section].default,
    mode: "onChange",
  });
  const onSubmit = (data: TBasicLiteral) => {
    data["title"] = template[section].title;
    updateContent(BasicLiteral(data), section);
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>{template[section].title}</div>
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
