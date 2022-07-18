import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import sharp from 'sharp';

export const resizeImg = async (
    filename: string,
    width: number,
    height: number
): Promise<string | undefined> => {
    const full_file_path = path.resolve(__dirname, '../../assets/full');
    const thumb_file_path = path.resolve(__dirname, '../../assets/thumb');

    //Make sure file exists
    if (!fs.existsSync(path.resolve(full_file_path, filename)))
        return 'File is not found';

    //Make sure target dir exists or create one
    if (!fs.existsSync(thumb_file_path)) {
        try {
            await fsPromises.mkdir(thumb_file_path);
        } catch (_) {
            return 'Failed to create target folder';
        }
    }

    const thumb_filename = filename.split('.').join(`_${width}x${height}.`);

    try {
        await sharp(path.resolve(full_file_path, filename))
            .resize(width, height)
            .toFile(path.resolve(thumb_file_path, thumb_filename));
    } catch (error) {
        return 'failed to resize specified file';
    }
    return '';
};
