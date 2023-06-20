const { rmSync, cpSync } = require("fs");

[
  "./dist",
].map(dir => {
  try {
    rmSync(dir, { recursive: true, })
  } catch (error) {
  }
});