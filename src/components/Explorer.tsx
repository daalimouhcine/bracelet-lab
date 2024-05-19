import { FaMagnifyingGlass } from "react-icons/fa6";
import DraggableComponent from "./DraggableComponent";

const components = [
  {
    id: 1,
    component: <div>Component 1</div>
  },
  {
    id: 2,
    component: <div>Component 2</div>
  }
];

const Explorer = () => {
  return (
    <div className='bg-zinc-800 min-h-screen'>
      <div className='flex gap-x-5 justify-between p-2 mb-2 border-b '>
        <h4>Explorer</h4>
        <div className='relative min-w-max'>
          <input
            type='text'
            className='w-full rounded-sm'
            placeholder='search by name'
          />
          <FaMagnifyingGlass className='absolute right-0 top-1/2 -translate-y-1/2' />
        </div>
      </div>
      <div className='flex mb-4 text-white'>
        <div className='flex-1'>
          <h5>Components</h5>
          <div className='flex flex-col gap-y-2 mt-2'>
          {components.map((component, index) => (
            <DraggableComponent key={component.id} id={component.id} index={index} component={component.component} moveComponent={() => {}} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
