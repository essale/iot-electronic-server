## Prerequisites
1. Node.js
2. MongoDB : 
  a. https://treehouse.github.io/installation-guides/mac/mongo-mac.html - `mac os instalation` 
3. Angular CLI: `npm i -g @angular/cli`
4. From project root: `npm install`
5. In case of MongoDB issues run: `npm install webpack --save-dev --save-exact`
6. Create new file named `.env` under the main project folder and add the following config:
  a. MONGODB_URI=mongodb://localhost:27017/mean
  b. SECRET_TOKEN=mean

## Run
### Development mode
`export MONGODB_URI=mongodb://localhost:27017`<br>
`npm run dev`: execute MongoDB, Angular build, TypeScript compiler and Express server.
`npm i -D webpack-cli`: install webpack cli in order to use public ip as well

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 

## Mongo
db name: mean
change user to admin:
```
db.users.update({username:"admin"}, {$set: {role : "admin"}})
```
z
create assets collection:
```
db.createCollection("assets")
db.assets.insert({})
```