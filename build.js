import { context } from "esbuild";

// Build the server
const watchServer = async () => {
  const ctx = await context({
    entryPoints: ["src/server/index.jsx"],
    bundle: true,
    outfile: "static/srv.cjs",
    platform: "node",
    // Esm
    format: "cjs",
  });

  await ctx.watch();
  console.log("Watching for changes...");
};
watchServer();

const watchClient = async () => {
  const ctx = await context({
    entryPoints: [
      "src/server/importmapHydrate.jsx",
      "src/server/Card.jsx",
      "src/server/List.jsx",
    ],
    bundle: false,
    outdir: "static",
    platform: "browser",
    format: "esm",
  });

  await ctx.watch();
  console.log("Watching for changes...");
};

watchClient();
