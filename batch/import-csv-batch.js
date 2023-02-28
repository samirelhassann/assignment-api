import fs from "node:fs";
import { parse } from "csv-parse";

const path = new URL("./example.csv", import.meta.url);

const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2, // skip the header line
});

async function runBatch() {
  fs.createReadStream(path)
    .pipe(csvParse)
    .on("data", async function (row) {
      const [title, description] = row;

      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
    });
}

runBatch();
