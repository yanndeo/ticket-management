import { Injectable } from '@nestjs/common';

@Injectable()
export class MatriculeGeneratorService {
  handle = async (count: number, name: string) => {
    const acronym = 'tkt';

    const d = new Date();
    console.log('count:', count);

    const data = `${name.slice(0, 3)}${d.getMonth()}${acronym}${
      count + 1
    }${d.getUTCFullYear().toString().slice(2)}`; //add code client

    console.log('matricule:', data.toUpperCase());
    return data.toUpperCase();

    //1- 3 premiere letter du nom de la company.
    //2- le mois en chiffre : Ex :11 => november
    //3- l'acronym choose
    //4- le nombre total de ticket de ce client + 1
    //5- 2 dernier chiffre de year : Ex : 2020 => 20
    //EX AVO11TKT520
  };
}
