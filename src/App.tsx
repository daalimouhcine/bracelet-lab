import BraceletCustomizer from "./components/BraceletCustomizer";
import Explorer from "./components/Explorer";

function App() {
  return (
    <div className='flex bg-zinc-600'>
      <div className='w-1/4'>
        <h2 className='text-xl mb-4'>Bracelet Customizer</h2>
        <Explorer />
      </div>
      <div className='w-3/4'>
        <BraceletCustomizer />
      </div>
    </div>
  );
}

export default App;
