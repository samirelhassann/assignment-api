import fs from "node:fs/promises";
import { TaskException } from "./exceptions/TaskException.js";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    const existDatabase = Array.isArray(this.#database[table]);

    if (existDatabase) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  delete(table, userId) {
    const index = this.#database[table].findIndex((row) => row.id === userId);

    if (index < 0) {
      throw new TaskException("Task not found", 404);
    }

    this.#database[table].splice(index, 1);
    this.#persist();
  }

  update(table, id, updatedUser) {
    const index = this.#database[table].findIndex((row) => row.id === id);

    if (index < 0) {
      throw new TaskException("Task not found", 404);
    }

    const updatedTask = {
      ...this.#database[table][index],
    };

    if (updatedUser) {
      Object.entries(updatedUser).forEach(([key, value]) => {
        updatedTask[key] = value;
      });
    }

    this.#database[table][index] = updatedTask;
    this.#persist();
  }
}
