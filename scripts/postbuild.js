const { rmSync, cpSync } = require("fs");

cpSync('./dist', '.', {
  recursive: true
});

[
  // "./dist",
].map(dir => {
  try {
    rmSync(dir, { recursive: true, })
  } catch (error) {
  }
});