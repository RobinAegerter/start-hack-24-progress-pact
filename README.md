# Next App Starter
Clone with: `npx create-next-app@latest my-new-next-app -e https://github.com/ralf-boltshauser/next-app-starter`

## Todo
- [ ] add a error page
- [ ] not found page
- [ ] loading etc.

## Getting Started


- [ ] Deployment
  - [ ] Change the NEXTAUTH_SECRET in .env to a random string `openssl rand -base64 32`
  - [ ] Create Google Cloud Project
  - [ ] Create a new OAuth client type web app
  - [ ] Add your domain to the google cloud project
  - [ ] Add the callback url for google provider to domain/api/auth/callback/google
  - [ ] Add a localhost:3000 callback url for development
  - [ ] Get a database (maybe in vercel, planetscale or just deploy a docker container with a database)
  - [ ] Make a git repo
  - [ ] Deploy the app on vercel
  - [ ] Add the domain to the vercel project
  - [ ] Set the NEXTAUTH_URL to domain without any path
  - [ ] Set the DATABASE_URL to the database url
  - [ ] (Adjust the database type in schema.prisma to the database type)

- [ ] Development
  - [ ] adjust the app name in the navbar
  - [ ] Visit shadcn/ui for components / theming
  - [ ] Extend the schema.prisma and run `npx prisma generate` to generate the types and `npx prisma migrate dev` to create the database tables. DON'T FORGET TO APPLY MIGRATIONS TO PROD
  - [ ] Implement your functionality in the /app route, otherwise change the callback in auth/sign-in/page.tsx route.

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
