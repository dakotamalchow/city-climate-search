import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use("/", graphqlHTTP({
    // need to import and put a schema here
}));

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`);
});

/*
Trying to follow along here (uses JS only, not TS):
https://medium.com/@utkarshprakash/setting-up-graphql-server-with-nodejs-express-and-mongodb-d72fba13216
https://github.com/utkarshp21/graphql-server-setup
*/