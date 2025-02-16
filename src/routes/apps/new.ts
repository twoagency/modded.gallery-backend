import { Context } from "hono";
import { HttpStatusCode, statusReponse } from "../../utils";
import { object, string, array, boolean, parse, ValiError, optional } from 'valibot';
import db from "../../db/db";
import { appsTable } from "../../db/schema";

const RequestSchema = object({
    name: string(),
    normal_app: string(),
    description: string(),
    features: array(string()),
    platforms: array(string()),
    official_links: array(
        object({
            name: string(),
            url: string(),
        })
    ),
    recommended: boolean(),
});

export default async function newAppRoute(context: Context) {
    const requestId = context.get("requestId");
    const logger = context.get("logger");
  
    logger.info("Called");
    
    try {
      const jsonBody = await context.req.json();
  
      if (!jsonBody) {
        logger.error("Empty body received");
        return statusReponse(requestId, "ERR", "Body not found", [], HttpStatusCode.BadRequest, context);
      }
  
      logger.debug("Parsing JSON body");
      const json = parse(RequestSchema, jsonBody);
  
      logger.debug("Converting features/platforms to JSON strings");
      const dbData = {
        ...json,
        features: JSON.stringify(json.features),
        platforms: JSON.stringify(json.platforms)
      };
  
      logger.debug("Inserting into database");
      await db.insert(appsTable).values(dbData);
  
      return statusReponse(requestId, "OK", "", [], HttpStatusCode.OK, context);
  
    } catch (error) {
      logger.error("Database error", { error }); // 👈 Fehlerobjekt loggen
      return statusReponse(requestId, "ERR", "Internal error", [], HttpStatusCode.InternalServerError, context);
    }
  }