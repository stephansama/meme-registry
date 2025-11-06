import * as fs from "node:fs/promises";
import * as url from "node:url";
import * as z from "zod";

export const registryEntrySchema = z.object({
	description: z.string(),
	tags: z.string().array(),
	title: z.string(),
	nsfw: z.boolean(),
});

export const registrySchema = z.object({
	memes: z.array(registryEntrySchema),
});

if (url.fileURLToPath(import.meta.url) === process.argv.at(1)) {
	const schema = JSON.stringify(z.toJSONSchema(registrySchema));

	await fs.writeFile("./registry.schema.json", schema, { encoding: "utf8" });
}
