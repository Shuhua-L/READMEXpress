import { useForm, useController, UseControllerProps } from "react-hook-form";
import { AboutTemplate } from "./Literals";
import { SaveButton, TextArea } from "./MyComponents";

type Props = {
  updateDocument: (doc: string) => void;
};

type FormValues = {
  description: string;
};

const About = (props: Props) => {
  const { handleSubmit, control, getValues, register, watch } = useForm<FormValues>({
    defaultValues: {
      description: `This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.`,
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
      <div className='collapse-title text-lg font-medium'>About</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
          <TextArea
            {...register("description")}
            name='description'
            label='Description'
            required={false}
            placeholder='Write about 1-2 paragraphs describing the purpose of your project.'
          />
          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default About;
