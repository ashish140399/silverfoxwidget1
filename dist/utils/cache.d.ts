declare const writeToCache: (key: any, data: any) => void;
declare const readFromCache: (key: any) => any;
declare const clearCahe: (key: any) => void;
export { readFromCache, writeToCache, clearCahe };
