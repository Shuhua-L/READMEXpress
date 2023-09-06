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
      className='flex justify-between grow items-center bg-white shadow-[0_0_0_calc(1px_/_var(--scale-x,1))_rgba(63,63,68,0.05),0_1px_calc(3px_/_var(--scale-x,1))_0_rgba(34,33,81,0.15)] rounded-[calc(4px_/_var(--scale-x,1))] box-border text-[#333] font-normal text-base px-5 py-[18px];'
      ref={setNodeRef}
      style={style}>
      <button
        className='flex w-3 items-center justify-center flex-[0_0_auto] touch-none cursor-[var(--cursor,pointer)] appearance-none bg-transparent p-[15px] rounded-[5px] border-[none] hover:bg-[rgba(0,0,0,0.05)] focus-visible:shadow-[0_0px_0px_2px_#4c9ffe];'
        {...attributes}
        {...listeners}>
        <MdDragIndicator className='flex-[0_0_auto] h-full overflow-visible fill-[#919eab] m-auto' />
      </button>
      {children}
      <button
        className='flex w-3 items-center justify-center flex-[0_0_auto] touch-none cursor-[var(--cursor,pointer)] appearance-none bg-transparent p-[15px] rounded-[5px] border-[none] hover:bg-[rgba(0,0,0,0.05)] focus-visible:shadow-[0_0px_0px_2px_#4c9ffe];'
        onClick={onRemove}>
        <MdDeleteForever className='#flex-[0_0_auto] h-full overflow-visible fill-[#919eab] m-auto' />
      </button>
    </li>
  );
}
