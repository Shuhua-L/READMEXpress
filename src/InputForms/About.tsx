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
