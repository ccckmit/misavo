service mongod stop
# mongod --port 27017 --dbpath db
service mongod start
# node server/lib/server.js
pm2 start server/lib/server.js
