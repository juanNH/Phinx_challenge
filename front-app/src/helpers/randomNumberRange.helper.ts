/**
 * 
 * @param min lower number range.
 * @param max top number range.
 * @returns random number between min and max.
 */
export function getRandomInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}