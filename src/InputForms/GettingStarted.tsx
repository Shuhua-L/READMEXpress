import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { TextArea, Input, SaveButton } from "./MyComponents";
import { HeaderTemplate } from "./Literals";
import { MdDeleteForever, MdAddCircle } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";

type Props = {
  updateDocument: (doc: string) => void;
};

type FormValues = {
  description: string;
  prerequisites: string;
  steps: {
    step: string;
    code: string;
  }[];
};

const GettingStarted = (props: Props) => {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      description: "Example getting started description",
      prerequisites: "Example prerequisites description",
      steps: [
        {
          step: "Example step",
          code: "Example code",
        },
      ],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "steps",
    control,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // TODO:
    // let literal = HeaderTemplate(data);
    // console.log(literal);
    // props.updateDocument(literal);
  };
  return (
    <div className='collapse collapse-arrow bg-base-200'>
      {/* <input type='radio' name='current-document' /> */}
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>Getting Started</div>
      <div className='collapse-content bg-neutral-content'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
          <TextArea
            {...register("description")}
            name='description'
            label='Getting Started Description'
            required={false}
            placeholder='This is an example of how you may give instructions on setting up your project locally.'
          />

          <TextArea
            {...register("prerequisites")}
            name='prerequisites'
            label='Prerequisites Description'
            required={false}
            placeholder='This is an example of how to list things you need to use the software and how to install them.'
          />

          <div className='inline-flex'>
            <h5>Installation Steps</h5>
            <span
              className='btn btn-xs btn-ghost'
              onClick={() =>
                append({
                  step: "step",
                  code: "code for step",
                })
              }>
              <BiSolidAddToQueue className='h-5 w-auto' />
            </span>
          </div>
          {fields.map((field, index) => {
            return (
              <span className='label-text block' key={field.id}>
                Step {index + 1}
                <div className='join w-full'>
                  <input
                    className='input-sm input-bordered join-item w-1/2'
                    placeholder='Installation Step'
                    {...register(`steps.${index}.step` as const)}
                  />
                  <input className='kbd border-none join-item w-5/12' placeholder='Code for step' />
                  <span
                    className='btn btn-sm bg-base-100 join-item h-8'
                    onClick={() => remove(index)}>
                    <MdDeleteForever className='fill-current h-6 w-auto' />
                  </span>
                </div>
              </span>
            );
          })}

          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default GettingStarted;
