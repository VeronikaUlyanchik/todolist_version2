export const sum = (state: number, num: number): number => state + num;
export const sub = (state: number, num: number): number => state - num;
export const div = (state: number, num: number): number => state / num;
export const mult = (state: number, num: number): number => state * num;


type SumActionType = {
    type: "SUM"
    num: number
}
type SubActionType = {
    type: "SUB"
    num: number
}
type DivActionType = {
    type: "DIV"
    num: number
}
type MultActionType = {
    type: "MULT"
    num: number
}
type ActionType = {
    type: "MULT" | "SUM" | "SUB" | "DIV"
    num: number
}

type ActionTypeA = SumActionType | SubActionType

export const calculatorReducer = (state: number, action: ActionType) => {
    switch (action.type) {
        case "SUM":
            return state + action.num
        case "SUB":
            return state - action.num
        case "MULT":
            return state * action.num
        case "DIV":
            return state / action.num
        default:
            return state
    }
}