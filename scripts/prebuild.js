const { rmSync } = require("node:fs");

[
  "./dist",
  "./plugins",
  "./esm",
  "umd",
  "constants.d.ts",
  "index.d.ts",
  "index.js"
].map(dir => {
  try {
    rmSync(dir, { recursive: true, force: true })
  } catch (error) {
    console.log(error)
  }
});
