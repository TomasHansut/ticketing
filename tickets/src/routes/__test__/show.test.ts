import request from "supertest";
import { app } from "../../app";

it('returns a 404 if the ticket is not found', async () => {
    await request(app).get('/api/tickets/aksdpoqkwp').send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
    const title = 'concert';
    const price = 20;

    const response = await request(app).get('/api/tickets/aksdpoqkwp').set('Cookie', global.getCookie()).send().expect(201);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});