import { useState } from "react";
import BraceletCustomizer from "./components/BraceletCustomizer";
import Explorer from "./components/Explorer";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";

function App() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState("");

  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title;
    if (e.over?.id !== "bracelet-droppable" || !newItem) return;
    const temp = [...cartItems];
    temp.push(newItem);
    setCartItems(temp);
    setActiveId("");
  };

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={addItemsToCart}>
      <div className='flex bg-zinc-600'>
        <div className='w-1/4'>
          <Explorer activeId={activeId} />
        </div>
        <div className='w-3/4'>
          <BraceletCustomizer items={cartItems} />
        </div>
      </div>
    </DndContext>
  );
}

export default App;
