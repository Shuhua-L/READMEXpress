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

const Usage = (props: Props) => {
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      description:
        "Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources. ",
    },
  });
  const onSubmit = (data: FormValues) => {
    let tem: TBasicTemplate = data;
    tem["title"] = "Usage";
    let literal = BasicTemplate(tem);
    props.updateDocument(literal);
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-lg font-medium'>Usage</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          <TextArea
            {...register("description")}
            name='description'
            label='Description'
            required={false}
            placeholder='Add notes about how to use the system.'
          />
          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default Usage;
