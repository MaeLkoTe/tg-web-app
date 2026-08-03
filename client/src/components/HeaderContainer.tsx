import { HeaderContainerProps } from "../types/types";

export const HeaderContainer = ({height, title}: HeaderContainerProps) => {
    
    const headerDivStyle = `${height} w-full flex items-center justify-around bg-gradient-to-br from-[#0b1b4d] via-[#3b4cc0] to-[#c98bff]`
    
    return (
        <div className={headerDivStyle}>
            <h1 className="relative text-white text-5xl sm:text-8xl font-semibold text-center">
                <span className="absolute inset-0 blur-2xl opacity-30 bg-white"></span>
                <span className="relative">
                        {title}
                </span>
            </h1>
        </div>
    )
}