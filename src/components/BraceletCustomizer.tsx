import React from "react";
import { useDroppable } from "@dnd-kit/core";

const BraceletCustomizer: React.FC<{ items: string[] }> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "bracelet-droppable",
  });

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Bracelet Customizer</h2>
      <div
        ref={setNodeRef}
        className={`flex h-10 items-center border bg-gray-600 ${
          isOver && "bg-blue-200"
        }`}>
        {props.items.map((item: any, index: number) => (
          <div key={index} className='flex items-center gap-x-2'>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BraceletCustomizer;
