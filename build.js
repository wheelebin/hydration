import { context } from "esbuild";
import { glob } from "glob";
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";

// Build the server
(async () => {
  const ctx = await context({
    entryPoints: ["src/server/index.js"],
    bundle: true,
    outfile: "static/srv.cjs",
    platform: "node",
    // Esm
    format: "cjs",
  });

  await ctx.watch();
  console.log("Server watching for changes...");
})();

// Build the client
(async () => {
  const ctx = await context({
    entryPoints: ["src/client/importmapHydrate.jsx"],
    bundle: false,
    outdir: "static/client",
    platform: "browser",
    format: "esm",
  });

  await ctx.watch();
  console.log("Client watching for changes...");
})();

// Build the shared
(async () => {
  let entryPoints = await glob("./src/shared/**/*.*");

  // Regex filter to only apply plugin to import statements towards internal files
  const filter = /^\.{1,2}(\/[\w-]+)+$/;

  const ctx = await context({
    entryPoints,
    bundle: true,
    outdir: "static/shared",
    platform: "browser",
    format: "esm",
    plugins: [
      esbuildPluginFilePathExtensions({
        cjsExtension: "js",
        filter,
      }),
    ],
    external: ["react", "react-dom"],
  });

  await ctx.watch();
  console.log("Shared watching for changes...");
})();
