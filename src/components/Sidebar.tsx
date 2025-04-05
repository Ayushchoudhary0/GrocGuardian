
import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Bell, ChefHat, Calendar, Plus } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-card border-r transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="p-4 flex justify-center items-center h-16 border-b">
        {isOpen ? (
          <h1 className="font-bold text-xl">GrocGuardian</h1>
        ) : (
          <span className="font-bold text-2xl">G</span>
        )}
      </div>
      
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              end
            >
              <Home size={20} />
              {isOpen && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <Plus size={20} />
              {isOpen && <span>Add Grocery</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/groceries" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <ShoppingCart size={20} />
              {isOpen && <span>Grocery List</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/notifications" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <Bell size={20} />
              {isOpen && <span>Notifications</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/recipes" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <ChefHat size={20} />
              {isOpen && <span>Recipe Suggestions</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">U</div>
          {isOpen && <span className="ml-2">User Name</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
