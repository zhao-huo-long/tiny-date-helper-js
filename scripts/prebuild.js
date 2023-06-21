const { rmSync, cpSync } = require("fs");

[
  "./dist",
  "./plugins",
].map(dir => {
  try {
    rmSync(dir, { recursive: true, })
  } catch (error) {
  }
});