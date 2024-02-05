# Task Crud

A CRUD task api built using native NodeJs

This is a project used for study purposes only • [Samir El Hassan](https://github.com/samirelhassann)

This project was built with the help of the [Rocketseat](https://www.rocketseat.com.br/) ![image 3](https://user-images.githubusercontent.com/91634008/206936638-05d22d2f-4c3a-4f45-861f-ff6fe1db990d.png)


## Language and Tools

<p align="left"> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> </p>

## Additional Libraries

- csv-parse

## Demo

## Instalation

```bash
npm install
```

## Usage

To start the API, run on root folder:

```bash
node --watch src/server.js
```

To execute the upload batch, run on another terminal in root folder while the API is running:

```bash
node batch/import-csv-batch.js
```

## Example cUrls

1. POST /tasks
```bash
curl --location --request POST 'http://localhost:3333/tasks' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "task 1",
    "description": "Task description"
}'
```

2. GET /tasks
```bash
curl --location --request GET 'http://localhost:3333/tasks'
```

3. PUT /tasks/{task_id}
```bash
curl --location -g --request PUT 'http://localhost:3333/tasks/{task_id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Altered title",
    "description": "Task description"
}'
```

4. PATCH /tasks/{task_id}/complete
```bash
curl --location --request PATCH 'http://localhost:3333/tasks/{task_id}/complete'
```


