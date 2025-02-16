import { Logger } from "winston";

declare module "hono" {
  interface ContextVariableMap {
    logger: Logger;
    requestId: string;
  }
}