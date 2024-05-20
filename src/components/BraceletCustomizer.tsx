import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";

const ItemTypes = {
  COMPONENT: "component",
};
interface ComponentItem {
  id: number;
  component: React.ReactNode;
}

const BraceletCustomizer: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null); // State to track hover index

  const moveComponent = (fromIndex: number, toIndex: number) => {
    setComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      const [movedComponent] = updatedComponents.splice(fromIndex, 1);
      updatedComponents.splice(toIndex, 0, movedComponent);
      return updatedComponents;
    });
  };

  const [, drop] = useDrop({
    accept: ItemTypes.COMPONENT,
    drop: (item: {
      id: number;
      component: React.ReactNode;
      index: number;
      fromExplorer: boolean;
    }) => {
      if (item.fromExplorer) {
        setComponents((prevComponents) => [
          ...prevComponents,
          { id: prevComponents.length, component: item.component },
        ]);
      }
      setHoverIndex(null); // Reset hover index on drop
    },
    hover: (item: { id: number; index: number }, monitor) => {
      const hoverBoundingRect = monitor.getClientOffset();
      if (!hoverBoundingRect) {
        return;
      }

      const hoverMiddleY = hoverBoundingRect.y;
      const hoverClientY = monitor.getClientOffset()!.y;

      const newHoverIndex = components.findIndex((_, i) => i === item.index);

      if (hoverClientY < hoverMiddleY) {
        setHoverIndex(newHoverIndex);
      } else {
        setHoverIndex(newHoverIndex + 1);
      }
    },
  });

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Bracelet Customizer</h2>
      <div
        ref={drop}
        className='flex relative items-center border p-4 bg-gray-600'>
        {components.map((componentData, index) => (
          <React.Fragment key={componentData.id}>
            <div className='flex'>
              {hoverIndex === index && (
                <div className='absolute top-0 w-0.5 h-full inline bg-blue-500' />
              )}
              <DraggableComponent
                key={componentData.id}
                id={componentData.id}
                index={index}
                component={componentData.component}
                moveComponent={moveComponent}
              />
            </div>
          </React.Fragment>
        ))}
        {hoverIndex === components.length && (
          <div className='absolute top-0 w-0.5 h-full inline bg-blue-500' />
        )}
      </div>
    </div>
  );
};

export default BraceletCustomizer;
