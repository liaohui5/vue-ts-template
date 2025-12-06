const handlerModules = import.meta.glob("./handlers/**.ts", { eager: true });

export const handlers = Object.values(handlerModules).flatMap(Object.values);
