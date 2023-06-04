# Introducing Naimu E-commerce: (Images below) Demo: https://naimu-app.vercel.app/
Welcome to Naimu E-commerce, an innovative and comprehensive enterprise application solution powered by the renowned MERN stack (MongoDB, Express.js, React.js, and Node.js), our platform offers an exceptional user experience with its visually stunning and scalable user interfaces, coupled with a robust and efficient backend.

At Naimu E-commerce, we understand the importance of providing seamless and secure payment options. That's why our platform integrates popular payment gateways such as Stripe.js and PayPal, ensuring hassle-free transactions for your customers. With these trusted and widely-used payment solutions, you can offer your customers a variety of payment methods, guaranteeing a smooth and convenient shopping experience.

We also prioritize the security of your platform and users. By incorporating JSON Web Tokens (JWT), we implement a secure authentication system that safeguards sensitive user information, allowing your customers to shop with confidence and trust.

Hosted Frontend and backend on Vercel.
Hosted images on Cloudinary.

## Installation and Setup
### Frontend
1. Navigate to the frontend directory: cd frontend
2. Install the dependencies: `npm install`
3. Start the development server: `npm start`

### Backend
1. Navigate to the backend directory: cd backend
2. Install the dependencies: `npm install`
3. Start the backend server: `npm run dev`

### Environment Variables
Before running the backend server, make sure to set up the environment variables in the backend/config/.env file. Below are the required environment variables:
```
PORT=8000
NODE_ENV=development
DB_URL=<Your MongoDB connection URL>
JWT_SECRET_KEY=<Your JWT secret key>
JWT_EXPIRES=7d
ACTIVATION_TOKEN_SECRET=<Your activation token secret>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_MAIL=<Your SMTP email>
SMTP_PASSWORD=<Your SMTP password>
STRIPE_SECRET_KEY=<Your Stripe secret key>
STRIPE_API_KEY=<Your Stripe API key>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Key>


```
Please replace <...> with your actual values for the respective environment variables.

## Usage
Once the frontend and backend are set up and running, you can access the application through the provided URL. Make sure to create an account and explore the various e-commerce features available.

## Front-end Dependencies 
| Number | Package Name                | Description                                        |
| ------ | --------------------------- | -------------------------------------------------- |
| 1      | @paypal/react-paypal-js     | PayPal integration for React                       |
| 2      | @reduxjs/toolkit            | Redux state management toolkit                     |
| 3      | @stripe/react-stripe-js     | Stripe integration for React                       |
| 4      | axios                       | Promise-based HTTP client                          |
| 5      | country-state-city           | Data for countries, states, and cities             |
| 6      | mongoose                    | MongoDB object modeling for Node.js                |
| 7      | react                       | JavaScript library for building user interfaces    |
| 8      | react-dom                   | Entry point to the React DOM package               |
| 9      | react-hook-form             | Forms validation and handling library for React     |
| 10     | react-hot-toast             | Toast notifications for React                      |
| 11     | react-icons                 | Icon library for React                             |
| 12     | react-redux                 | Official Redux bindings for React                  |
| 13     | react-router-dom            | Declarative routing for React                      |
| 14     | react-scripts               | Configuration and scripts for Create React App      |
| 15     | react-spinners              | Loading spinners for React                         |
| 16     | redux                       | Predictable state container for JavaScript apps    |
| 17     | redux-logger                | Redux middleware for logging actions and state     |
| 18     | redux-persist               | Persist and rehydrate a Redux store                |
| 19     | redux-thunk                 | Thunk middleware for Redux                         |
| 20     | redux-toolkit               | Opinionated Redux setup                            |
| 21     | sweetalert2                 | Customizable alert and popup library               |
| 22     | react-glider                | Carousel

## Back-end Dependencies
| Number | Package Name    | Description                                          |
|--------|-----------------|------------------------------------------------------|
| 1      | bcrypt          | Library for hashing and comparing passwords          |
| 2      | cookie-parser   | Middleware for parsing cookies                        |
| 3      | cors            | Middleware for enabling CORS in Express               |
| 4      | dotenv          | Library for loading environment variables             |
| 5      | express         | Fast, unopinionated, minimalist web framework for Node.js |
| 6      | jsonwebtoken    | JSON Web Token implementation for authentication      |
| 7      | mongoose        | MongoDB object modeling for Node.js                   |
| 8      | multer          | Middleware for handling multipart/form-data           |
| 9      | nodemailer      | Library for sending emails                            |
| 10     | nodemon         | Tool for automatically restarting the server during development |
| 11     | stripe          | Stripe API library for Node.js                        |


## User Interfaces
|   Landing Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/9cb5435c-3de1-4f6e-ad68-01c1b11c4259) |

|   Login Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/7b525a86-b6fd-465f-bd01-a79783fca0c0)|

|   Products Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/3aa0bf61-7409-4e3c-98f9-b454533136bf)|

|   Product Detail Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/0e4174c6-c00a-4753-9c52-643de7e10f0c)|

|   Cart Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/677a5943-6a0a-4450-9ae1-951597956d72)|

|   Checkout Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/f520ba56-c89b-458a-a970-dd91579ae29d) |

|   Payment Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/f226c63a-f4e7-494f-b7de-cacaa1e30504) |

|   Order Created Page - Notification  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/30357a48-068b-497b-ae16-4745d32cb67b) |

|   Order  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/9e7cc90f-66ec-439e-b8ec-43a554b00fc8) |

|   Review Page  |
|   -----  |
| <img width="1440" alt="image" src="https://github.com/Tjandra-Putra/naimu-app/assets/57522674/a9f1e485-fcb7-4311-9b31-2156c1f57620"> 

|   Profile Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/a91e8ef3-3793-43cb-8128-139f60afc758) |

|   Orders Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/af1fc910-a623-4597-9ee2-371d908eea2c) |

|   Change Password Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/b98f8d5c-de22-402f-88fb-39c1d2b29a5d) |

|   Addresses Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/b48a6d84-92f3-4d5c-b1a0-916950c3f622) |

|   Products Page - Search Bar, CheckBoxes  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/88e45bf4-ce53-498c-a1a4-c56980f62e22) |

|   Not Found Page  |
|   -----  |
| ![image](https://github.com/Tjandra-Putra/naimu-app/assets/57522674/3a09c8fa-6f34-45f0-b9a4-f6a61baf7529) |

