export const remove = (arr: Array<String>, str: string): Array<String> => {
    const i = arr.indexOf(str);
    const new_arr = arr.splice(i, i-1);
    return new_arr;
};