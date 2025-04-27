import { MenuDropdown } from "../CommonComponents/MenuComponent/menuComponent";


export const HeaderComponent = () => {
    return (
      <header className="bg-white shadow-md px-1 py-2 shadow-2xs my-2">
        <div className=" flex items-center justify-between px-4">
          <h4 className="text-l font-bold text-blue-600">MyApp</h4>
  
          {/* <nav className="space-x-4">
            <button className="text-gray-700 hover:text-blue-600">Home</button>
            <button className="text-gray-700 hover:text-blue-600">About</button>
            <button className="text-gray-700 hover:text-blue-600">Contact</button>
          </nav> */}
          <div><MenuDropdown/></div>
        </div>
      </header>
    );
  };
  
  