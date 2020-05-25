import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const filheHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${filheHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
