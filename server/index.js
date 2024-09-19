import express from 'express';
import dotenv from 'dotenv';
import ConntectToMongoDB from './dataBase.js';
import SignUp from './routes/Authentication/Sign-up.js';
import SignIn from './routes/Authentication/Sign-in.js';
import About from './routes/Authentication/About.js';
import Create from './routes/Data/Create.js';
import Delete from './routes/Data/Delete.js';
import Update from './routes/Data/Update.js';
import FetchAll from './routes/Data/Fetch All.js';
import DeleteItem from './routes/Data/Delete Item.js'
import FetchAllDeleted from './routes/Data/Fetch All Deleted.js'
import cors from 'cors';


dotenv.config();
const port = process.env.REAL_PORT;
const app = express();

app.use(cors())
app.use(express.json());

ConntectToMongoDB();

// -------------------- Routers Start ------------------------
//Authentication routes
app.use('/auth', SignUp);
app.use('/auth', SignIn);

//Data routes
app.use('/data', Create);
app.use('/data', Delete);
app.use('/data', Update);
app.use('/data', FetchAll);
app.use('/data', DeleteItem);
app.use('/data', FetchAllDeleted);
app.use('/data', About);
// -------------------- Routers End ------------------------


app.listen(port, () => {
    console.log(`Server is Listened Successfully!`);
});