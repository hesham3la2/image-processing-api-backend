import express from 'express';
import path from 'path';
import fs from 'fs';
import { resizeImg } from '../utilities/imageProcessor';

const routes = express.Router();
const assets = path.resolve(__dirname, '../../assets');

routes.get('/images', async (req: express.Request, res: express.Response) => {
    const { filename, width, height } = req.query;
    if (
        typeof filename !== 'string' ||
        typeof width !== 'string' ||
        typeof height !== 'string' ||
        isNaN(parseInt(width)) ||
        isNaN(parseInt(height))
    ) {
        res.send('Bad request');
        return;
    }

    const thumb_filename = filename.split('.').join(`_${width}x${height}.`);

    if (fs.existsSync(path.resolve(assets, 'thumb', thumb_filename))) {
        res.sendFile(path.resolve(assets, 'thumb', thumb_filename));
    } else if (fs.existsSync(path.resolve(assets, 'full', filename))) {
        const errors = await resizeImg(
            filename,
            parseInt(width),
            parseInt(height)
        );

        //check if file already exist
        if (errors === '')
            res.sendFile(path.resolve(assets, 'thumb', thumb_filename));
        else res.send('Failed to resize image');
    } else {
        res.send(`file "${filename}" is not found`);
    }
});

export default routes;
