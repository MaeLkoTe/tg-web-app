import { OptionItemsProps } from "../types/types"

export const OptionItem = ({title, component, svg}: OptionItemsProps) => {

    return (    
        <div className="my-2.5 flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center text-main">
                {svg}
                <p className="text-semibold">{title}</p>
            </div>
            {component}
        </div>
    )
}