let IS_PROD = true;
const server =
 IS_PROD  ?
   "http://localhost:8080" 
   :
    "http://localhost:8080"; 
    


export default server;