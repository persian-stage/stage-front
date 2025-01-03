# Stage API

## Description

This is the Frontend Project that runs Next.js app.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Working with Docker

Ensure you have the following installed on your machine:

- Docker
- Docker Compose

1. Create and start the containers:
```sh
docker compose -p stage up -d
```

2. Remove the Frontend container:
```sh
docker stop stage-front-app && docker rm stage-front-app
```

3. Remove the entire containers ( Backend and Frontend ):

```sh
docker compose -p stage down
```

#### Building Docker Image

```sh
docker build -t front-app .
```

## Usage

Once the containers are up and running, you can access the application on http://amirhs.test.
