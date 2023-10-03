import { NavLink, Outlet } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
    return ( 
        <>
            <div className="flex w-full p-4">
                <NavLink to="/" className="flex-1 text-4xl font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                    Price Pilot
                </NavLink>
                <ModeToggle />
            </div>
            <div className="h-full">
                <Outlet />
            </div>
        </>
    );
}
 
export default Navbar;