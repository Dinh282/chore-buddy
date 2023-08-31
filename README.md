# chore-buddy

![license](https://img.shields.io/badge/License-MIT-yellowgreen)

## Description

The Chore Buddy App is a versatile platform designed to simplify chore management and foster responsibility within families. With a blend of modern technologies like JSX, CSS, React, Vite, Ant Design, GraphQL, MongoDB, JWT, and Framer Motion, the app ensures a seamless experience for parents and children. Its core purpose is to alleviate the common challenges of chore organization and allowance distribution in households.

Through centralized chore management, the app empowers parents to effortlessly create, delegate, and oversee chores. By gamifying the experience, children can get assigned chores instilling a sense of achievement and teaching financial skills. Challenges in technology integration, mobile responsiveness, and data management were met head-on, resulting in an app that provides fluid animations, adaptable design, and robust privacy features.

Throughout the app's development, our team encountered and successfully surmounted various challenges. We navigated the intricate landscape of integrating diverse technologies, seamlessly blending React, GraphQL, MongoDB, and JWT to ensure harmonious functionality. Overcoming the intricacies of ensuring mobile responsiveness across devices required meticulous testing and the artful utilization of Framer Motion, resulting in an aesthetically pleasing and adaptable design. Robust data management strategies were employed to secure user data and chore-related information, demonstrating our commitment to privacy and security.


## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Credits](#credits)
4. [Questions](#questions)  
5. [License](#license)


## Installation
 Download and install the Node.js LTS version from [Node.js](https://nodejs.org/en).
- Clone the repo using:

        git@github.com:Dinh282/chore-buddy.git

- Or download the code from https://github.com/Dinh282/chore-buddy.git and
open it with VS Code.  
- Make sure you are in the root path of the project folder and install dependencies for the project with:

        npm i

- Then run the following command to start a script that would cd into the client and server directories and run npm i concurrently. 

        npm run install

- This app uses MongoDB to store data. You can set up your database with a free account from: https://www.mongodb.com/atlas/database.

- Create an env file in the root of the server directory and set JWT_SECRET to a string of your choice. 

- After installing the dependencies you can run the following command:

        npm run dev

- The npm run dev command will start the app and open your browser to localhost:3000, the landing page of our app. 


## Usage

- Sign Up: Begin by visiting the landing page and signing up for an account to access the app's features.

- Authorization Token: After logging in, an authorization token is generated. To verify, you can inspect cookies in the developer console.

- Mobile Responsiveness: Test the app's mobile responsiveness by adjusting the screen width to different sizes.

- Chore Management: Create a personalized list of chores and set the corresponding allowance for each task.

- Children's Accounts: Create separate accounts for your children, allowing them to log in and engage with the app.

- Children's Dashboard: For child accounts, you'll notice a distinct dashboard. While they can't create chores or modify allowances, they can select chores from the list and review their chosen tasks.

Additionally, here's the alternative content with some refinements:

Quick Access: Skip the installation process by visiting our live page at https://chore-buddy-6e6d2559dc60.herokuapp.com/.

Explore Demo: For a detailed walkthrough, watch our demo video below:



https://github.com/Dinh282/chore-buddy/assets/112836220/0cab957e-c48a-4c4b-a782-fe3d33c6e71d




The following screenshots are of 

Screenshot of :
![Screenshot of ]()


## Credits:
1. https://stackoverflow.com/questions/72316837/vite-error-during-the-deployment-to-heroku (Help with Heroku deployment issue. Vite wasn't found when attempting to deploy to Heroku. Vite is a devDependency in the package.json at the root of the client directory. Heroku prunes devDeps to minimize app size. Command line code: heroku config:set NPM_CONFIG_PRODUCTION=false fixed this issue. Alternatively, we can add CONFIG VARS on Heroku with the KEY of NPM_CONFIG_PRODUCTION and VALUE of false.)

2. https://ant.design/components/overview/ (Ant Design Documentation)

3. https://www.framer.com/motion/ (Framer Motion Documentation)

4. Instructor and TAs.

## Questions
Get in touch with the team members:

- Lucas: [GitHub](https://github.com/skywalkah)
- Andrea: [GitHub](https://github.com/anicrob)
- Anu: [GitHub](https://github.com/anup2307)
- Felix: [GitHub](https://github.com/FelixW01)
- Dinh: [GitHub](https://github.com/Dinh282)

Feel free to contact any of us if you have questions or want to know more about our project. We're also excited to share our various other projects on GitHub!


## License

Please refer to the LICENSE section in the repository.

## Links

Repo: https://github.com/Dinh282/chore-buddy

Deployed Application: https://chore-buddy-6e6d2559dc60.herokuapp.com/
---
