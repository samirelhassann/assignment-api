import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { TaskException } from "./exceptions/TaskException.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { q: searchTerm } = req.query;

      const tasks = database.select(
        "tasks",
        searchTerm
          ? {
              title: searchTerm,
              description: searchTerm,
            }
          : null
      );

      return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        throw new TaskException("Inform both title and description", 500);
      }

      const index = database.select("tasks").length;

      const user = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", user);

      return res.writeHead(201).end(JSON.stringify(user));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/upload"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        throw new TaskException("Inform both title and description", 500);
      }

      const index = database.select("tasks").length;

      const user = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", user);

      return res.writeHead(201).end(JSON.stringify(user));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        throw new TaskException("Inform both title and description", 500);
      }

      const updatedUser = {
        title,
        description,
        updated_at: new Date(),
      };

      database.update("tasks", id, updatedUser);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const updatedUser = {
        completed_at: new Date(),
      };

      database.update("tasks", id, updatedUser);

      return res.writeHead(204).end();
    },
  },
];
