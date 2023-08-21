"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

import { TextArea, SaveButton } from "./MyComponents";
import getLiteral from "./Literals";
import template from "@/data/template";
import type { TSectionProps, TTechnologies } from "@/types";

const Technologies = ({ section, updateContent }: TSectionProps) => {
  const { handleSubmit, register, control, resetField, setValue } = useForm<TTechnologies>({
    defaultValues: template[section].default,
  });
  const onSubmit: SubmitHandler<TTechnologies> = (data) => {
    // console.log(data);
    let literal = getLiteral({ section, props: data });
    updateContent(literal, section);
  };

  const fetchOptions = async (inputValue: string) => {
    const response = await fetch(`/api/badges?input=${inputValue}`);
    const data = await response.json();
    // console.log("Fetched: ", data);
    return data;
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>{template[section].title}</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2 h-fit'>
          <TextArea
            {...register("description")}
            name='description'
            label='Description'
            required={false}
            placeholder='Write about 1-2 paragraphs describing the purpose of your project.'
          />

          <span className='w-full'>
            <label className='label-text'>List style: </label>
            <select className='select select-bordered  select-sm' {...register("listStyle")}>
              <option value='text'>text</option>
              <option value='badge'>badge</option>
            </select>
          </span>

          <Controller
            name='selected'
            control={control}
            render={({ field }) => (
              <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                isSearchable={true}
                isClearable={true}
                loadOptions={fetchOptions}
                {...field}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
              />
            )}
          />

          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default Technologies;
