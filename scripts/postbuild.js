const { rmSync } = require("fs");

[
  "./js",
].map(dir => {
  try {
    rmSync(dir, { recursive: true, })
  } catch (error) {
    console.log(error)
  }
});
