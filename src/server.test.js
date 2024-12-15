
const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('./server');


describe ('Server', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true });    
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return Home Route message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Home Route');
    });

    it("should register a new user", async () => {
        const response = await request(app).post( '/users/register').send({
            email: 'test@email.com',
            firstName: 'usertest',
            lastName: 'testuser',
            phoneNumber: '123456789',
            password: '123478'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.email).toBe('test@email.com');
    });
})
