import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { TextArea, Input, SaveButton } from "./MyComponents";
import { HeaderTemplate } from "./Literals";
import { MdDeleteForever } from "react-icons/md";

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

          <h5>Installation Steps</h5>
          {fields.map((field, index) => {
            return (
              <span className='label-text block' key={field.id}>
                Step {index + 1}
                <div className='join max-w-sm'>
                  <input
                    className='input-sm input-bordered join-item'
                    placeholder='Installation Step'
                    {...register(`steps.${index}.step` as const)}
                  />
                  <input className='kbd border-none join-item' placeholder='Code for step' />
                  <span className='badge join-item h-8' onClick={() => remove(index)}>
                    <MdDeleteForever className='fill-current w-5 h-5' />
                  </span>
                </div>
              </span>
            );
          })}

          <button
            type='button'
            className='btn btn-sm'
            onClick={() =>
              append({
                step: "step",
                code: "code for step",
              })
            }>
            APPEND
          </button>

          <SaveButton />
        </form>
      </div>
    </div>
  );
};

export default GettingStarted;
