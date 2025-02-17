import { Context } from "hono";
import { HttpStatusCode, statusReponse } from "../../utils";
import db from "../../db/db";
import { appsTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export default async function getAllAppsRoute(context: Context) {
    const requestId = context.get("requestId");
    const logger = context.get("logger");
  
    logger.info("Called");
    
    try {
        let { normal_app } = context.req.query();

        if (!normal_app) {
            logger.debug("Querying Database");
            const apps = await db.select().from(appsTable)

            logger.debug("Get all modded apps");
            return statusReponse(requestId, "OK", "Successfully got all modded apps", apps, HttpStatusCode.OK, context);
        }

        normal_app = normal_app.toLowerCase()
    
        logger.debug("Querying Database");
        const apps = await db.select().from(appsTable).where(eq(appsTable.normal_app, normal_app))

        logger.debug(`Got all modded apps for ${normal_app}`);
        return statusReponse(requestId, "OK", `Successfully got all modded ${normal_app} apps`, apps, HttpStatusCode.OK, context);
    } catch (error) {
        logger.error("Database error", { error });
        return statusReponse(requestId, "ERR", "Internal error", [], HttpStatusCode.InternalServerError, context);
    }
  }