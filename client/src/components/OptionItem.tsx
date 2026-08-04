import { OptionItemsProps } from "../types/types"

export const OptionItem = ({title, component, svg}: OptionItemsProps) => {

    return (    
        <div className="my-2.5 flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center">
                {svg}
                <p className="text-slate-900/80 text-semibold">{title}</p>
            </div>
            {component}
        </div>
    )
}