import { Action, ActionsResponse } from "../types/apiTypes"

export const validateActionsResponse = (data: unknown): ActionsResponse | null => {
    if (typeof data !== "object" || data === null) { return null }
    else if (!("actions" in data) || !Array.isArray(data.actions)) { return null }
    else if (!data.actions.every(isTonTransfer)) { return null }
    return { actions: data.actions } 
}

const isTonTransfer = (value: unknown): value is Action => {
    if (typeof value !== "object" || value === null) { return false }
    if ( 
        (("action_id" in value) && (typeof value.action_id === "string") && value.action_id) &&
        (("end_utime" in value) && (typeof value.end_utime === "number") && (value.end_utime >= 0) && (Number.isInteger(value.end_utime))) &&
        (("success" in value)) && (typeof value.success === "boolean") && 
        (("type" in value)) && (value.type === "ton_transfer") &&
        (("details" in value)) && (typeof value.details === "object" && value.details !== null)
     ) { 
        const details = value.details
        if (
            ("source" in details) && ("destination" in details) && ("value" in details) &&
            ((typeof details.source === "string") && details.source) &&
            ((typeof details.destination === "string") && details.destination) &&
            (typeof details.value === "string") && (/^\d+$/.test(details.value))
        ) { return true }
    }
    return false
}