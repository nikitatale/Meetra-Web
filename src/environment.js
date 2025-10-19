let IS_PROD = true;
const server =
 IS_PROD  ?
   "https://meetra-web-backend.onrender.com" 
   :
    "http://localhost:8080"; 
    


export default server;