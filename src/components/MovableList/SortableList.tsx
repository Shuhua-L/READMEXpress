import {
  Active,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useAppDispatch, useAppSelector } from "@/store";
import { sectionsWithKeysSelector, updateSections } from "@/store/documentSlice";
import { Fragment, useMemo, useState } from "react";

import type { DropAnimation } from "@dnd-kit/core";

export type TSection = {
  id: number;
  sectionKey: string;
};

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

export function MovableList<T extends TSection>() {
  const dispatch = useAppDispatch();
  const sections = useAppSelector(sectionsWithKeysSelector);

  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => sections.find((section) => section.id === active?.id),
    [active, sections]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const renderSection = (item: TSection) => {
    return (
      <SortableItem
        id={item.id}
        key={item.id}
        onRemove={() => {
          dispatch(
            updateSections(
              sections.filter((section) => section.id !== item.id).map((item) => item.sectionKey)
            )
          );
        }}>
        {item.sectionKey}
      </SortableItem>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = sections.findIndex(({ id }) => id === active.id);
          const overIndex = sections.findIndex(({ id }) => id === over.id);

          dispatch(
            updateSections(
              arrayMove(sections, activeIndex, overIndex).map((item) => item.sectionKey)
            )
          );
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}>
      <SortableContext items={sections}>
        <ul className='flex flex-col gap-2.5 p-0' role='application'>
          {sections.map((item) => (
            <Fragment key={item.id}>{renderSection(item)}</Fragment>
          ))}
        </ul>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeItem ? renderSection(activeItem) : null}
      </DragOverlay>
    </DndContext>
  );
}

MovableList.Item = SortableItem;
