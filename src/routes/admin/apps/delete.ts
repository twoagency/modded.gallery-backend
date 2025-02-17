import { Context } from "hono";
import { HttpStatusCode, statusReponse } from "../../../utils";
import db from "../../../db/db";
import { appsTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default async function deleteAppRoute(context: Context) {
    const requestId = context.get("requestId");
    const logger = context.get("logger");

    logger.info("Called");
    try {
      const id = context.req.param("id");
  
      logger.info("Executing database update")
        const [result] = await db.delete(appsTable)
          .where(eq(appsTable.id, +id))
          .returning();
  
        if (!result) {
            logger.error("App not found in database", { appId: id });
            return statusReponse(requestId, "ERR", "App not found", [], HttpStatusCode.NotFound, context);
        }

        logger.info("Successfully updated app");
        return statusReponse(requestId, "OK", "Successfully updated app", [], HttpStatusCode.BadRequest, context)
  
    } catch (error) {
      logger.error("Update failed", error);
      return statusReponse(requestId, "ERR", "Internal server error", [], HttpStatusCode.InternalServerError, context);;
    }
}