export default function CollapseForm({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='collapse collapse-arrow bg-base-200 dark:bg-neutral dark:text-neutral-content'>
      <input type='checkbox' className='peer' />
      <div className='collapse-title text-lg font-medium peer-checked:bg-base-300 '>{title}</div>
      <div className='collapse-content peer-checked:border-2 border-base-300'>{children}</div>
    </div>
  );
}
