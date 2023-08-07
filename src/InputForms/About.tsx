import React from "react";
import { useForm, useController, UseControllerProps } from "react-hook-form";

type Props = {};
type FormValues = {
  FirstName: string;
};

function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
      <p>{field.value}</p>
    </div>
  );
}

const About = (props: Props) => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className='collapse collapse-arrow bg-base-200'>
      {/* <input type='radio' name='current-document' /> */}
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>About</div>
      <div className='collapse-content'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input control={control} name='FirstName' rules={{ required: true }} />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
};

export default About;
