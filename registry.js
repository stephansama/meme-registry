import * as fs from "node:fs/promises";
import * as url from "node:url";
import * as z from "zod";

if (url.fileURLToPath(import.meta.url) === process.argv.at(1)) run();

function registryEntrySchema() {
	return z.object({
		description: z.string(),
		know_your_meme: z.string().optional(),
		nsfw: z.boolean(),
		path: z.string(),
		slug: z.string(),
		tags: z.string().array(),
		title: z.string(),
	});
}

function registrySchema() {
	return z.object({ memes: z.array(registryEntrySchema()) });
}

async function run() {
	const schema = JSON.stringify(z.toJSONSchema(registrySchema()));

	await fs.writeFile("./registry.schema.json", schema, { encoding: "utf8" });
}
