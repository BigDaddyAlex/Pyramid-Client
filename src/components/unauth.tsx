import { Outlet } from 'react-router-dom';
import Navbar from './navbar';


function Unauth() {
  return (
    <div>
      <Navbar />
      <div className="px-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Unauth;
