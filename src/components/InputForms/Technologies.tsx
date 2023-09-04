import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { TextArea, SaveButton } from "./MyComponents";
import type { TSectionProps, TTechnologies } from "@/types";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { updateContent, sectionTemplateSelector } from "@/store/documentSlice";
import CollapseForm from "./CollapseForm";
import MultiSelect from "./MultiSelect";

const Technologies = ({ section }: TSectionProps) => {
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) => sectionTemplateSelector(state, section));

  const { handleSubmit, register, control, watch, reset } = useForm<TTechnologies>({
    defaultValues: template?.default,
  });

  const onSubmit: SubmitHandler<TTechnologies> = (data) => {
    console.log(data);
    dispatch(updateContent({ section, formData: data }));
  };

  useEffect(() => {
    reset(template?.default);
  }, [template?.default, reset]);

  const watchStyle = watch("listStyle", template?.default?.listStyle);

  return (
    <CollapseForm title={template?.title}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2 h-fit'>
        <TextArea
          {...register("description")}
          name='description'
          label='Description'
          required={false}
          placeholder='Write about 1-2 paragraphs describing the purpose of your project.'
        />

        <span className='w-full'>
          <label className='label-text '>List style: </label>
          <select className='select select-bordered select-sm' {...register("listStyle")}>
            <option value='text'>text</option>
            <option value='badge'>badge</option>
          </select>
        </span>

        <Controller
          name='selected'
          control={control}
          render={({ field }) => <MultiSelect watchStyle={watchStyle} {...field} />}
        />

        <SaveButton />
      </form>
    </CollapseForm>
  );
};

export default Technologies;
