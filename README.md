# STYLEFLEX-FRONTEND
StyleFlex is a custom fashion ordering web app.This is the frontend built with React and deployed via vercel.It connects to a Flask backend API for data, authentication,and order, management.
## TECHSTACK
```
- React (with create react app)
- React Router
- Tailwind css
- JWT-based Auth
- Axios for API calls
- Verecl for deployment
```
## PROJECT STRUCTURE 
```
styleflex-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Orders.js
│   │   ├── OrderForm.js
│   │   ├── AdminOrders.js
│   │   ├── Profile.js
│   │   └── NotFound.js
│   ├── api/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── .env
├── tailwind.config.js
├── README.md
├── package.json
└── postcss.config.js
```
## GETTING STARTED
### 1. Clone the repository 
```
git clone https://github.com/your-username/styleflex-frontend.git
cd styleflex-frontend
```
### 2. Install dependencies 
```
npm install
```
### 3. Environment variables  
```
REACT_APP_API_URL=https://styleflex-custom-fashion-ordering-app.onrender.com/api
```
### 4. Start the app
```
npm start
```
## FEATURES 
```
- User authentication with JWT
- profile management
- Browse and order from a design gallery
- View and manage personal orders
- Admin dashboard for all orders
- Responsive design with tailwind css\
```
## API INTERGRATION
```
All API calls are made via the preconfigured Axios instance in src/api.js
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
```
## TESTING 
```
Tested by:
- Registering and logging in
- Navigating protected routes like /orders
- Viewing/administering orders
- Updating your profile
```
## LICENESE
MIT 
### ACKNOWLEDGEMENTS
```
- ELAINE BUYEKE
- STACEY TAREI
- LEWIS
- BILLY ADAMS
```
 
