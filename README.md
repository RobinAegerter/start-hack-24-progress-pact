# Progres Pact
Progress Pact is a web application crafted for the Bell Food Group Challenge at the Start Hack 2024 event in St. Gallen. The main aim of the app is to provide health support to employees, contributing to a happier, healthier workplace. The fully functional app can be explored on our 
[Website](https://progress-pact.ralf-boltshauser.com/auth/sign-in). 
To meet the challenge criteria, the app addresses:

- [X] health 
- [X]  nutrition
- [X]  exercise
- [X]  well-being
- [X] work place design
- [X]  social interactions
  
## Features
Here are the unique features our app offers:
- Feedback with an Avatar: The avatar instantly mimics delayed rewards and punishments to provide emotional responses. This aids users in predicting their emotional state based on their actions.
- Goals: Setting goals in all primary life areas with incentives to encourage completion.
- Coach: An AI-powered coach which offers personalized training plans and guidance for goal achievement.
- Chat: An automatic translation enabled chat feature allowing employees to interact in their preferred language.
- Events: Discover and join events aligned with your interests and converse with like-minded people. Rewards for participation provided by the company or the avatar.

## Technology
We leveraged the following technologies for our application:
#### Backend and Frontend
- NextJS
#### Database
- Prisma 
#### Login
- NextAuth
#### UI
- shadcn UI
#### Hosting
- Vercel

Our team custom-made the models used in the app using Blender. The server hosts these models, and the client fetches them. The AI-powered coach is backed by ChatGPT, which utilizes the user's goals and other pertinent information for guidance.

## Getting Started
To effectively run the application, please ensure to have the following elements ready:
- [ ] You'll need environment files for NextAuth, Google, ChatGPT, and Prisma. These include:
    - `DATABASE_URL`
    - `DATABASE_DIRECT_URL`
    - `NEXTAUTH_SECRET`
    - `NEXTAUTH_URL`
    - `OPENAI_API_KEY`
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`

- [ ] Running the Database
  - You need to start the Prisma Docker Container. To init Prisma run `npx prisma generate` and `npx prisma migrate dev`. 

- [ ] Starting the Server
  - Just run `npm run dev` to start the NextJS server.