import { useDraggable } from "@dnd-kit/core";

const DraggableComponent = (props: any) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.children,
    data: { title: props.children },
  });


  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className='cursor-move w-fit p-2'>
      {props.children}
    </div>
  );
};

export default DraggableComponent;
