Instructions to set-up the application and run locally

1. From your terminal , inside the project folder, 'cd frontend' - To access the application client folder directory

2. Run 'npm install' - To install all the dependencies

3. Run `npm run dev` - To start the local development server

4. Open a new terminal

5. From your terminal in the project folder, 'cd backend' - To access the application backend folder directory

6. Run 'npm install' - To install all the dependencies

7. Run 'npm start' - To start your backend server


Live Demo Hosted On Vercel

https://task-manager-final-client.vercel.app/


Current Limitations 

1. There is no centralized database to store all registed users and prevent repeat registrations.

2. No centralized database to normalize registration data and prevent 
registration using too many repeating characters in details. eg: 111111111111111111111111111 or CCCCCCCCCCCCCCCCCCCCCC

3. Log in state not persistent upon reload causing log in each time the page is reloaded from the browser.

4. There is no centralized database to store tasks created and assign them to a user


Potential Solutions to Problems

1. A relation database to centralize and store all data that passes through the app

2. Adding server checks to normalize registration details and enchance security

3. Use cookies to persist log in state for a longer period

