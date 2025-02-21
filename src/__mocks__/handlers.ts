const handlerModules = import.meta.glob("./handlers/**.ts", { eager: true });

/* @ts-ignore */
export const handlers = Object.values(handlerModules).map(Object.values).flat();
