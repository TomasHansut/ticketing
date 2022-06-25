import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

/*
 * Routes of the app
 */
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// if route not found throw 404
/* sync =>
app.all('*', () => {
    throw new NotFoundError();
});
*/
/* classic call handler async =>
app.all('*', async (req, res, next) => {
    next(new NotFoundError());
});
*/
// with 'express-async-errors' package => 
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// error handler
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening on 3000!!!!!");
});