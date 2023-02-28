import http from "node:http";

import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";
import { TaskException } from "./exceptions/TaskException.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (!route) {
    return res.writeHead(404).end(JSON.stringify({ error: "Route not found" }));
  }

  try {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  } catch (err) {
    if (err instanceof TaskException) {
      return res.writeHead(err.getStatusCode()).end(err.formatErrorMessage());
    }

    return res.writeHead(500).end(JSON.stringify({ error: err.message }));
  }
});

server.listen(3333);
