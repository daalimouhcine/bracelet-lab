import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";

const BraceletCustomizer: React.FC = () => {
  const [components, setComponents] = useState<
    { id: number; component: React.ReactNode }[]
  >([]);

  const moveComponent = (fromIndex: number, toIndex: number) => {
    setComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      const [movedComponent] = updatedComponents.splice(fromIndex, 1);
      updatedComponents.splice(toIndex, 0, movedComponent);
      return updatedComponents;
    });
  };

  const [, drop] = useDrop({
    accept: "component",
    drop: (item: { component: React.ReactNode }) => {
      setComponents((prevComponents) => [
        ...prevComponents,
        { id: prevComponents.length, component: item.component },
      ]);
    },
  });

  return (
    <div className='p-4'>
      <div ref={drop} className='border p-4 min-h-[200px] bg-gray-800'>
        {components.map((componentData, index) => (
          <DraggableComponent
            key={componentData.id}
            id={componentData.id}
            index={index}
            component={componentData.component}
            moveComponent={moveComponent}
          />
        ))}
      </div>
    </div>
  );
};
export default BraceletCustomizer;
