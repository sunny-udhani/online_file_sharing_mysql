export const handleInput1 = "handleInput1";
export const handleInput2 = "handleInput2";
export const handleOperation = "handleOperation";

export function pushInput1(number) {
    return {
        type: handleInput1,
        number
    }
}

export function pushInput2(number) {
    return {
        type: handleInput2,
        number
    }

}
