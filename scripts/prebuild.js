const { rmSync } = require("fs");

[
  "./dist",
  "./plugins",
  "./esm",
  "umd",
].map(dir => {
  try {
    rmSync(dir, { recursive: true, })
  } catch (error) {
  }
});