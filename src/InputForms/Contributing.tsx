import { useForm, Controller } from "react-hook-form";
import { BasicTemplate } from "./Literals";
import type { TBasicTemplate } from "./Literals";
import { SaveButton, TextArea } from "./MyComponents";

import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type Props = {
  updateDocument: (doc: string) => void;
};

type FormValues = {
  description: string;
};

const Contributing = (props: Props) => {
  const { handleSubmit, register, control, resetField } = useForm<FormValues>({
    defaultValues: {
      description: `
Here's how you can contribute:

- [Open an issue]() if you believe you've encountered a bug.
- Make a [pull request]() to add new features/make quality-of-life improvements/fix bugs.
        `,
    },
    mode: "onChange",
  });

  const handleClick = () => {
    resetField("description");
  };

  const onSubmit = (data: TBasicTemplate) => {
    // console.log({ data });
    data["title"] = "Contributing";
    let literal = BasicTemplate(data);
    props.updateDocument(literal);
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>Contributing</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          <button type='button' className='btn btn-sm' onClick={handleClick}>
            Reset
          </button>
          {/* <TextArea
            {...register("description")}
            name='description'
            label='Description'
            required={false}
            placeholder='Contributions are what make the open source community such an amazing place to learn, inspire, and create. '
          /> */}
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field }) => <SimpleMdeReact {...field} />}
          />
          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default Contributing;
