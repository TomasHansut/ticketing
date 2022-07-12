import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@p13577-tickets/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

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

// Cookie session need to be set first
app.use(currentUser);
app.use(showTicketRouter);

// Routes for the app
app.use(createTicketRouter);
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