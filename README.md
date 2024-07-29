# Next.js Blog

## To Run Locally

1. `docker compose up -d` to setup the database
2. `pnpm install` to install dependencies
3. `pnpm payload migrate` to create the database tables
4. `pnpm dev` to start the dev server
5. `open http://localhost:3000/admin` to access the admin panel and create your first admin user
6. To write an article you need to change the role of current admin user to `editor` or create a new user with role `editor`
7. Create a few articles and publish them
8. `open http://localhost:3000/` to see the articles list
