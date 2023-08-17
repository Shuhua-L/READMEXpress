import { useForm, Controller } from "react-hook-form";
import { BasicTemplate } from "./Literals";
import type { TBasicTemplate } from "./Literals";
import { SaveButton } from "./MyComponents";

import dynamic from "next/dynamic";
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";
import { options } from "@/Editor/EditorOptions";

type Props = {
  updateContent: (doc: string, section: string) => void;
};

type FormValues = {
  description: string;
};

const Usage = (props: Props) => {
  const { handleSubmit, control, resetField, setValue } = useForm<FormValues>({
    defaultValues: {
      description:
        "Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources. ",
    },
  });
  const onSubmit = (data: TBasicTemplate) => {
    data["title"] = "Usage";
    let literal = BasicTemplate(data);
    props.updateContent(literal, "usage");
  };

  const editorOptions = useMemo(options, []);

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>Usage</div>
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
