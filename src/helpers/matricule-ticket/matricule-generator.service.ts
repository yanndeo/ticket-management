import { Injectable } from '@nestjs/common';

@Injectable()
export class MatriculeGeneratorService {
  //constructor(private customerService: ClientService) {}
  handle = async (name: string) => {
    const acronym = 'tkt';

    const d = new Date();

    const data = `${name.slice(0, 3)}${d.getMonth()}${acronym}${d
      .getUTCFullYear()
      .toString()
      .slice(2)}${d.getSeconds()}`; //add code client

    return data.toUpperCase();
  };
}
