import { useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

import { ResetClearButtons, SaveButton } from "../FormComponents/MyComponents";
import { options } from "@/components/Editor/EditorOptions";
import type { TSectionProps, TBasicLiteral } from "@/types";

import { useAppSelector, useAppDispatch } from "@/store";
import { updateContent, sectionTemplateSelector } from "@/store/documentSlice";
import CollapseForm from "../FormComponents/CollapseForm";

const Usage = ({ section }: TSectionProps) => {
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) => sectionTemplateSelector(state, section));

  const { handleSubmit, control, resetField, setValue, reset } = useForm<TBasicLiteral>({
    defaultValues: template?.default,
  });
  const onSubmit = (data: TBasicLiteral) => {
    data["title"] = template?.title;
    dispatch(updateContent({ section, formData: data }));
  };

  const handleReset = () => resetField("description");
  const handleClear = () => setValue("description", "");

  useEffect(() => {
    reset(template?.default);
  }, [template?.default, reset]);

  const editorOptions = useMemo(options, []);

  return (
    <CollapseForm title={template?.title}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4 px-2'>
        <ResetClearButtons handleReset={handleReset} handleClear={handleClear} />
        <Controller
          name='description'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SimpleMdeReact options={editorOptions} {...field} ref={null} className='shadow-lg' />
          )}
        />
        <SaveButton />
      </form>
    </CollapseForm>
  );
};

export default Usage;
