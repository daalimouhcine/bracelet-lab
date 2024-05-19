import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableComponentProps {
  id: number;
  component: React.ReactNode;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  fromExplorer?: boolean; // Add optional fromExplorer flag
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  id,
  component,
  moveComponent,
  index,
  fromExplorer = false, // Default to false if not provided
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "component",
    hover(item: { id: number; index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: { id, index, component, fromExplorer },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`p-2 h-fit ${isDragging ? "opacity-50" : "opacity-100"}`}>
      {component}
    </div>
  );
};

export default DraggableComponent;
