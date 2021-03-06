import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@p13577-tickets/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // If in test mode secure = false cookie can use HTTP protocol
        secure: process.env.NODE_ENV !== 'test'
    })
);

// Routes for the app
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

// Add error handler
app.use(errorHandler);

export { app }