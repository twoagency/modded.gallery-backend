import { Context } from "hono";
import { object, string, array, boolean, parse, optional } from 'valibot';
import { HttpStatusCode, statusReponse } from "../../../utils";
import db from "../../../db/db";
import { appsTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

const RequestSchema = object({
    name: optional(string()),
    normal_app: optional(string()),
    description: optional(array(string())),
    platforms: optional(array(string())),
    official_links: optional(
        array(
            object({
                name: string(),
                url: string(),
            })
        )
    ),
    recommended: optional(boolean()),
});

export default async function updateAppRoute(context: Context) {
    const requestId = context.get("requestId");
    const logger = context.get("logger");

    logger.info("Called");
    try {
      const id = context.req.param("id");
  
      logger.debug("Parsing request body");
      const json = parse(RequestSchema, await context.req.json());
  
      logger.info("Preparing database update data");
      const updateData = Object.entries({
        name: (v: string) => v,
        normal_app: (v: string) => v.toLowerCase(),
        description: (v: string[]) => JSON.stringify(v),
        platforms: (v: string[]) => JSON.stringify(v),
        official_links: (v: any) => v,
        recommended: (v: boolean) => v,
      }).reduce((acc, [key, transform]) => {
        const typedKey = key as keyof typeof json;
        if (typedKey in json && json[typedKey] !== undefined) {
          acc[key as keyof typeof acc] = (
            transform as (v: typeof json[typeof typedKey]) => any
          )(json[typedKey]);
        }
        return acc;
      }, {} as Partial<typeof appsTable.$inferInsert>);
  
      logger.debug("Processed update data", { updateData });

      if (Object.keys(updateData).length === 0) {
        logger.warn("Empty update data received", { originalBody: context.req.json() });
        return statusReponse(requestId, "ERR", "No update data", [], HttpStatusCode.BadRequest, context);
    }
  
    logger.info("Executing database update")
      const [result] = await db.update(appsTable)
        .set(updateData)
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