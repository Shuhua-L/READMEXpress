import { useForm } from "react-hook-form";
import { BasicTemplate } from "./Literals";
import type { TBasicTemplate } from "./Literals";
import { SaveButton, TextArea } from "./MyComponents";

type Props = {
  updateDocument: (doc: string) => void;
};

type FormValues = {
  description: string;
};

const Contributing = (props: Props) => {
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      description: `
Here's how you can contribute:

- [Open an issue]() if you believe you've encountered a bug.
- Make a [pull request]() to add new features/make quality-of-life improvements/fix bugs.
        `,
    },
  });
  const onSubmit = (data: FormValues) => {
    let tem: TBasicTemplate = data;
    tem["title"] = "Contributing";
    let literal = BasicTemplate(tem);
    props.updateDocument(literal);
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>Contributing</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          <TextArea
            {...register("description")}
            name='description'
            label='Description'
            required={false}
            placeholder='Contributions are what make the open source community such an amazing place to learn, inspire, and create. '
          />
          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default Contributing;
