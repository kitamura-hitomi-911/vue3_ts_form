const isArray = <T>(arg: T | T[]): arg is Array<T> => {
    return Array.isArray(arg);
};
export default isArray