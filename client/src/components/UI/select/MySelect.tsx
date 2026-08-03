import React from "react"

interface MySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string, label: string }[] 
}

export const MySelect = ({options, ...props}: MySelectProps) => {

    return (
        <select {...props}>
            {options.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
            )
        )}
        </select>    
    )
} 