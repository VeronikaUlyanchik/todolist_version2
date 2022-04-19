import {calculatorReducer, div, mult, sub, sum} from "./tasks";

test('sum', ()=> {
    const state = 10;
    const num = 5;

    const result = sum(state,num);

    expect(result).toBe(15)
})

test ('sub', ()=> {
    expect(sub(20,30)).toBe(-10)
})
test('div', () => {
    expect(div(10,5)).toBe(2);
})
test('mult', () => {
    expect(mult(10,5)).toBe(50);
})

test('sum of two numbers with calculatorReducer', ()=> {
    expect(calculatorReducer(3,{type:"SUM", num:5})).toBe(8)
})
test('sub of two numbers with calculatorReducer', ()=> {
    expect(calculatorReducer(3,{type:"SUB", num:5})).toBe(-2)
})
test('div of two numbers with calculatorReducer', ()=> {
    expect(calculatorReducer(15,{type:"DIV", num:5})).toBe(3)
})
test('mult of two numbers with calculatorReducer', ()=> {
    expect(calculatorReducer(3,{type:"MULT", num:5})).toBe(15)
})