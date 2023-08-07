import { ChangeEvent } from "react";
import { useForm, useController, UseControllerProps } from "react-hook-form";
import { AboutTemplate } from "./Literals";

type Props = {
  updateDocument: (doc: string) => void;
};

type FormValues = {
  description: string;
};

function Textarea(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);
  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = e.target;
  //   field.onChange(value); // data send back to hook form
  //   updateDocument(value);
  // };

  return (
    <div>
      <textarea
        {...field}
        className='textarea textarea-bordered w-full'
        placeholder={props.name}
        // onChange={handleChange}
        onChange={field.onChange}
      />
      <p>{field.value}</p>
    </div>
  );
}

const About = (props: Props) => {
  const { handleSubmit, control, getValues, register, watch } = useForm<FormValues>({
    defaultValues: {
      description: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => {
    let literal = AboutTemplate(data);
    console.log(literal);
    props.updateDocument(literal);
  };

  const textInput = watch("description");

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      {/* <input type='radio' name='current-document' /> */}
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>About</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
          {/* <Textarea control={control} name='description' rules={{ required: true }} /> */}

          <textarea
            {...register("description")}
            className='textarea textarea-bordered w-full'
            placeholder='Write about 1-2 paragraphs describing the purpose of your project.'
          />
          <button type='submit' className='btn btn-wide mx-auto'>
            Save
          </button>
        </form>
        <div>Outside of form: {textInput}</div>
      </div>
    </div>
  );
};

export default About;
