# unibit_tambola

##ENV File should consist of 
PORT=5001
SECRET_ACCESS_TOKEN=12345

---------------------------------------------------------------------
api1[POST]:http://localhost:5001/user/register
description:"To register with the new user"
body:{
  "name":"Saikat",
  "email":"xyz@gmail.com",
  "password":"1234"
}

------------------------------------------------------------------------
api2[POST]: http://localhost:5001/user/login
description:"To login with username and password"
body:{
  "email":"123@gmail.com",
  "password":"1234"
}
output:{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJTYWlrYXQiLCJlbWFpbCI6IjEyMjIzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2ODU3OTg4MDgsImV4cCI6MTY4NTgwOTYwOH0.w_oAeDueWba3GOCW9tmyw_C0q5mXuvOe2ubZqVm6qFU",
  "userId": "37d66686-c118-4230-ad29-6aa6d916082e"
}

------------------------------------------------------------------------------
api3 [POST]:http://localhost:5001/user/ticket?userId=02c67b0d-c309-4c7b-8d8d-2fb1dea89d6e
description:"To create Tambola Tickets"
body{
"repetition":2
}
auth: JWT token 

-------------------------------------------------------------------------------
api 4[GET]:http://localhost:5001/user/ticket?userId=02c67b0d-c309-4c7b-8d8d-2fb1dea89d6e
description:"To view the tickets created by a particular user "
auth:JWT token 

-------------------------------------------------------------------------------

api5[GET]:http://localhost:5001/user/allUser

--------------------------------------------------------------------
