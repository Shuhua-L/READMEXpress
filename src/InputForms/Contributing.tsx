import { useForm, Controller } from "react-hook-form";
import { BasicTemplate } from "./Literals";
import type { TBasicTemplate } from "./Literals";
import { SaveButton, TextArea } from "./MyComponents";

import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";
import { options } from "@/Editor/EditorOptions";

type Props = {
  updateDocument: (doc: string) => void;
};

type FormValues = {
  description: string;
};

const Contributing = (props: Props) => {
  const { handleSubmit, register, control, resetField, setValue } = useForm<FormValues>({
    defaultValues: {
      description: `Here's how you can contribute:

- [Open an issue]() if you believe you've encountered a bug.
- Make a [pull request]() to add new features/make quality-of-life improvements/fix bugs.
        `,
    },
    mode: "onChange",
  });

  const onSubmit = (data: TBasicTemplate) => {
    data["title"] = "Contributing";
    let literal = BasicTemplate(data);
    props.updateDocument(literal);
  };

  const editorOptions = useMemo(options, []);

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>Contributing</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          {/* <TextArea
            {...register("description")}
            name='description'
            label='Description'
            required={false}
            placeholder='Contributions are what make the open source community such an amazing place to learn, inspire, and create. '
          /> */}

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
              <SimpleMdeReact options={editorOptions} {...field} className='shadow-lg' />
            )}
          />
          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default Contributing;
