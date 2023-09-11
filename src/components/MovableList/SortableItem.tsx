import type { CSSProperties, PropsWithChildren } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator, MdDeleteForever } from "react-icons/md";

interface Props {
  id: UniqueIdentifier;
  onRemove?(): void;
}

export function SortableItem({ children, id, onRemove }: PropsWithChildren<Props>) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <li
      className='flex flex-row items-center bg-neutral-100 text-neutral-focus rounded-md p-1'
      ref={setNodeRef}
      style={style}>
      <button
        className='btn btn-sm w-7 bg-transparent border-none touch-none appearance-none text-opacity-60'
        {...attributes}
        {...listeners}>
        <MdDragIndicator className='w-5 h-full overflow-visible m-auto fill' />
      </button>
      <div className='flex flex-[8]'>{children}</div>
      <button
        className='btn btn-sm w-7 bg-transparent border-none touch-none appearance-none text-opacity-60'
        onClick={onRemove}>
        <MdDeleteForever className='h-full w-5 overflow-visible m-auto' />
      </button>
    </li>
  );
}
