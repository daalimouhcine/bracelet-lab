import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableComponent = (props: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.children,
    data: { title: props.children },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='cursor-move w-fit p-2'>
      {props.children}
    </div>
  );
};

export default DraggableComponent;
