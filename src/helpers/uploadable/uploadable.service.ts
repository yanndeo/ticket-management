import {
  Injectable,
  BadRequestException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

import * as fs from 'fs';
import path from 'path';
import * as mime from 'mime-types';
import { v4 as uuid } from 'uuid';
import sizeOf from 'image-size';

export const limitDefault = 2 * 1024 * 1025;

@Injectable()
export class UploadableService {
  /**
   * convert base64 data to image file
   * store image into folder logos
   * check size bytes and extension match
   * return filename
   * @param path
   * @param _64String
   * @param limitSize
   */
  _uploadableFile = (
    path: string,
    _64String: string,
    limitSize: number = limitDefault,
  ): string => {
    const matches = _64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (matches.length !== 3) {
      throw new BadRequestException(`Invalid input string file`);
    }

    const imageBuffer = Buffer.from(matches[2], 'base64'); //decodedImg.data;
    //const type = matches[1]; //decodedImg.type;
    const extension = sizeOf(imageBuffer).type; //mime.extension(type);
    const fileName = `${uuid()}.${extension}`;
    const sizebytes = imageBuffer.byteLength / 1024;

    if (sizebytes > limitSize) {
      const limitToMo = Math.round((limitSize / 1024) / 1024);
      throw new PayloadTooLargeException(
        `size doesn't must be greater than limit: ${limitToMo} Mo `,
      );
    }

    if (extension.match(/\/(jpg|jpeg|png)$/)) {
      throw new UnsupportedMediaTypeException();
    }

    try {
      fs.writeFileSync(path + fileName, imageBuffer, 'utf8');
      return fileName;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  };

  /**
   * remove image file into folder
   * with realpath
   * @param path
   * @param filename
   */
  _unlinkedFile = (path: string, filename: string): any => {
    const realPath = `${path}${filename}`;
    console.log(realPath);
    fs.unlink(realPath, (error) => {
      if (!error) return true;
      else console.log(error); //send mail To admin
    });
    /*  try {
      fs.unlinkSync(realPath);
      return true;
    } catch (error) {
      throw error;
    } */
  };
}
