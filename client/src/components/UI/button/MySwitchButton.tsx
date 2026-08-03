import React from "react"

interface MySwitchButtonProps extends React.InputHTMLAttributes<HTMLInputElement>{

}

export const MySwitchButton = ({...props}: MySwitchButtonProps) => {

    return (
        <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
            <input {...props} type="checkbox" className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0" />
            <span className="block h-6 w-11 rounded-full bg-slate-900/20 ring-1 ring-slate-900/10 transition-colors peer-checked:bg-indigo-600/70"></span>
            <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5"></span>
        </span>
    )
}