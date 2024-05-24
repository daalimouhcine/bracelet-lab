import React, { useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);


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
        setComponents((prevComponents) => {
          const updatedComponents = [...prevComponents];
          updatedComponents.splice(hoverIndex ?? updatedComponents.length, 0, {
            id: prevComponents.length,
            component: item.component,
          });
          return updatedComponents;
        });
      }
      setHoverIndex(null); // Reset hover index on drop
    },
    hover: (item: { id: number; index: number }, monitor) => {
      // get the hover index depending on 
        
    },
  });

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Bracelet Customizer</h2>
      <div
        ref={drop}
        className={`flex relative items-center border bg-gray-600 ${
          components.length === 0 && "p-4"
        }`}>
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
              {/* {hoverIndex === components.length &&
                index === components.length - 1 && (
                  <div className=' absolute top-0 w-0.5 h-full inline bg-red-500' />
                )} */}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BraceletCustomizer;
