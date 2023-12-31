import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";

import { TextArea, SaveButton, CodeInput } from "../FormComponents/MyComponents";
import type { TSectionProps, TDownloadTemplate } from "@/types";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { updateContent, sectionTemplateSelector } from "@/store/documentSlice";
import CollapseForm from "../FormComponents/CollapseForm";

const GettingStarted = ({ section }: TSectionProps) => {
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) => sectionTemplateSelector(state, section));

  const { register, handleSubmit, control, reset } = useForm<TDownloadTemplate>({
    defaultValues: template?.default,
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "steps",
    control,
  });

  const onSubmit: SubmitHandler<TDownloadTemplate> = (data) => {
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
          label='Getting Started Description'
          required={false}
          placeholder='This is an example of how you may give instructions on setting up your project locally.'
        />

        <TextArea
          {...register("preDescription")}
          name='preDescription'
          label='Prerequisites Description'
          required={false}
          placeholder='What things you need to install the software and how to install them.'
        />

        <CodeInput
          {...register("preCode")}
          name='preCode'
          label='Prerequisites Code'
          placeholder='Give examples'
        />

        <div className='block'>
          <h4 className='inline-block'>Installation Steps</h4>
          <span
            className='btn btn-xs btn-ghost'
            onClick={() =>
              append({
                step: "step",
                code: "code example",
              })
            }>
            <BiSolidAddToQueue className='h-5 w-auto' />
          </span>
        </div>
        {fields.map((field, index) => {
          return (
            <span className='label-text block' key={field.id}>
              Step {index + 1}
              <div className='join w-full'>
                <input
                  className='input-sm input-bordered join-item w-1/2'
                  placeholder='Installation Step'
                  {...register(`steps.${index}.step` as const)}
                />
                <input
                  className='kbd #border-none join-item w-5/12'
                  placeholder='Code for step'
                  {...register(`steps.${index}.code` as const)}
                  spellCheck={false}
                />
                <span
                  className='btn btn-sm bg-base-100 join-item h-8'
                  onClick={() => remove(index)}>
                  <MdDeleteForever className='fill-current h-6 w-auto' />
                </span>
              </div>
            </span>
          );
        })}

        <SaveButton />
      </form>
    </CollapseForm>
  );
};

export default GettingStarted;
