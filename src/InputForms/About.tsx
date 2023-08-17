import { useForm } from "react-hook-form";
import { BasicTemplate } from "./Literals";
import type { TBasicTemplate } from "./Literals";
import { SaveButton, TextArea } from "./MyComponents";

type Props = {
  updateContent: (doc: string, section: string) => void;
};

type FormValues = {
  description: string;
};

const About = (props: Props) => {
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      description: `This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.`,
    },
    mode: "onChange",
  });
  const onSubmit = (data: TBasicTemplate) => {
    data["title"] = "About";
    let literal = BasicTemplate(data);
    props.updateContent(literal, "about");
  };

  return (
    <div className='collapse collapse-arrow bg-base-200'>
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
