# MongoDB_login-app
connect to mongo db this project use mongodb Atlas to authenticate user and password.
the code is draf version without mongodb token.
requirement
1. create login-app path and copy server.js to the login-app path
2. set up server.js to login-app path and cd to "login-app"
3. initialize node use " npm init -y "
4. npm install mongoose bcryptjs
5. required dependencies " npm install express mongoose bcryptjs body-parser ejs "
6. package for session management " npm install express-session "
7. localhost use "bash mongodb" and "bash node server.js"

option for MongoDB
1. Open a new terminal window and start the MongoDB Shell:  "bash mongosh"
2. Check the list of databases: "bash show dbs"
3. Create a new database: "bash use loginApp"
4. Create a collection for users: "bash db.createCollection("users")"
5. Insert a sample user document: "bash db.users.insertOne({ username: "admin", password: "hashedpassword" })"
//Replace "hashedpassword" with an actual hashed password (use a library like bcrypt in your application to hash passwords).
7. Verify the document: "bash db.users.find()"
