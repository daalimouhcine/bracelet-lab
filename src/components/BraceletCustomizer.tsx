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
    },
  });

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Bracelet Customizer</h2>
      <div ref={drop} className='flex items-center border p-4 bg-gray-600'>
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
