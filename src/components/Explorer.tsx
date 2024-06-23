import React from "react";
import DraggableComponent from "./DraggableComponent";
import { DragOverlay } from "@dnd-kit/core";

const Explorer: React.FC<{ activeId: string }> = ({ activeId }) => {
  const fruits = ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇"];

  return (
    <div className='bg-zinc-800 min-h-screen p-4'>
      <div className='flex gap-x-5 justify-between p-2 mb-2 border-b'>
        <h4 className='text-white'>Explorer</h4>
      </div>
      <div className='text-white'>
        <h5>Components</h5>
        <div className='flex flex-col gap-y-2 mt-2'>
          {fruits.map((fruit) => (
            <DraggableComponent key={fruit}>{fruit}</DraggableComponent>
          ))}
          <DragOverlay>
            {activeId ? <div className='cursor-move w-fit p-2'>{activeId}</div> : null}
          </DragOverlay>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
