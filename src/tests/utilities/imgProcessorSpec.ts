import path from 'path';
import fs from 'fs';
import { resizeImg } from '../../utilities/imageProcessor';

describe('Test functions of imageProcessor file', () => {
    const assets = path.resolve(__dirname, '../../../assets');

    describe('test resizeImg function', () => {
        it('succeeds to resize the image without errors', async () => {
            expect(await resizeImg('fjord.jpg', 200, 200)).toBe('');
        });

        afterAll(() => {
            fs.unlinkSync(path.resolve(assets, 'thumb/fjord_200x200.jpg'));
        });
    });
});
