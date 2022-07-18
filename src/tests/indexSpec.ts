import fs from 'fs';
import path from 'path';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test endpoints', () => {
    describe('get /images endpoint', () => {
        it('succeeds to resize image', async () => {
            const res = await request.get(
                '/api/images?filename=fjord.jpg&width=200&height=200'
            );
            expect(res.status).toBe(200);
        });

        it('fails if the specified file is not found', async () => {
            const res = await request.get(
                '/api/images?filename=jord.jpg&width=200&height=200'
            );

            expect(res.text).toBe('file "jord.jpg" is not found');
        });

        it('fails if the wrong width or height was provided', async () => {
            const res = await request.get(
                '/api/images?filename=fjord.jpg&width=test&height=200'
            );
            expect(res.text).toBe('Bad request');
        });
        afterAll(() => {
            fs.unlinkSync(
                path.resolve(__dirname, '../../assets/thumb/fjord_200x200.jpg')
            );
        });
    });
});
