import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

import getLiteral from "./Literals";
import { SaveButton } from "./MyComponents";
import { options } from "@/Editor/EditorOptions";
import template from "@/data/template";
import type { TSectionProps, TBasicLiteral } from "@/types";

import { useAppDispatch } from "@/store";
import { updateContent } from "@/store/features/documentSlice";

const Usage = ({ section }: TSectionProps) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, resetField, setValue } = useForm<TBasicLiteral>({
    defaultValues: template[section].default,
  });
  const onSubmit = (data: TBasicLiteral) => {
    let literal = getLiteral({ section, props: data });
    dispatch(updateContent({ sec: section, doc: literal }));
  };

  const editorOptions = useMemo(options, []);

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>{template[section].title}</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          <div>
            <button
              type='button'
              className='btn btn-sm w-1/2'
              onClick={() => resetField("description")}>
              Reset
            </button>
            <button
              type='button'
              className='btn btn-sm w-1/2'
              onClick={() => setValue("description", "")}>
              Clear
            </button>
          </div>
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SimpleMdeReact options={editorOptions} {...field} ref={null} className='shadow-lg' />
            )}
          />
          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default Usage;
