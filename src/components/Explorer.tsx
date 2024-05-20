import React from 'react';
import { FaMagnifyingGlass, FaPlus } from 'react-icons/fa6';
import DraggableComponent from './DraggableComponent';

const components = [
  {
    id: 1,
    component: <div>Component 1</div>,
  },
  {
    id: 2,
    component: <div>Component 2</div>,
  },
  {
    id: 3,
    component: <FaPlus className='w-fit text-white' />,
  },
];

const Explorer: React.FC = () => {
  return (
    <div className='bg-zinc-800 min-h-screen p-4'>
      <div className='flex gap-x-5 justify-between p-2 mb-2 border-b'>
        <h4 className='text-white'>Explorer</h4>
        <div className='relative min-w-max'>
          <input
            type='text'
            className='w-full rounded-sm'
            placeholder='search by name'
          />
          <FaMagnifyingGlass className='absolute right-0 top-1/2 transform -translate-y-1/2 text-white' />
        </div>
      </div>
      <div className='text-white'>
        <h5>Components</h5>
        <div className='flex flex-col gap-y-2 mt-2'>
          {components.map((component, index) => (
            <DraggableComponent key={component.id} id={component.id} index={index} component={component.component} moveComponent={() => {}} fromExplorer={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
