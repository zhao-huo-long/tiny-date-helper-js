const { rmSync } = require("fs");

[
  "./dist",
  "./types"
].map(dir => {
  try {
    rmSync(dir, { recursive: true, })
  } catch (error) {
  }
});
