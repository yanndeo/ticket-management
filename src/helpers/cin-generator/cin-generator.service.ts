import { Injectable } from '@nestjs/common';

@Injectable()
export class CinGeneratorService {
  async handle() {
    const d = new Date();
    const data = `CASL${d.getMonth()}${d.getUTCFullYear()}${d.getSeconds()}`;

    return data;
  }
}
