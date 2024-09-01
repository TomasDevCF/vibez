import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [tailwind(), db(), auth(), react()],
  output: "server",
  adapter: vercel(),
});
