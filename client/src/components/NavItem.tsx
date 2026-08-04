import { NavItemProps } from "../types/types";

export const NavItem = ({ title, content, isActive, onClick }: NavItemProps) => {
    
    const buttonStyle = "min-w-16 flex flex-col items-center cursor-pointer ring-1 ring-gray-200 rounded-3xl px-2 py-1 ml-1.5";
    const activeButtonStyle = isActive ? "text-white bg-[#6C7CFF]" : "text-black";

    return (
        <button 
            className={`${buttonStyle} ${activeButtonStyle}`} 
            onClick={onClick}
        >
            {content}
            {title}
        </button>
    );
};