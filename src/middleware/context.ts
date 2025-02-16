// middleware/context.ts
import { MiddlewareHandler } from "hono";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger";

export const contextMiddleware: MiddlewareHandler = async (c, next) => {
  // Erzeuge eindeutige Request-ID
  const requestId = uuidv4();
  
  // Extrahiere Routenpfad
  const routePath = c.req.path;

  // Erstelle Child-Logger mit Metadaten
  const requestLogger = logger.child({ 
    route: routePath,
    requestId: requestId
  });

  // Setze Variablen im Context
  c.set("requestId", requestId);
  c.set("logger", requestLogger);

  // Füge Request-ID zum Response-Header hinzu
  c.header("X-Request-ID", requestId);

  await next();
};