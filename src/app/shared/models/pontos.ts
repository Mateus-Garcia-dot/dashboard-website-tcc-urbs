export class Pontos {
    
    NOME: string;
    NUM: string;
    SEQ: string;
    GRUPO: string;
    SENTIDO: string;
    TIPO: string;
    ITINERARY_ID: string;
    COORD: number[];
    table: any[];

    constructor( NOME: string, NUM: string, SEQ: string, GRUPO: string, SENTIDO: string, TIPO: string, ITINERARY_ID: string, COORD: number[], 
        table: any[]) {
            this.NOME = NOME;
            this.NUM = NUM;
            this.SEQ = SEQ;
            this.GRUPO = GRUPO;
            this.SENTIDO = SENTIDO;
            this.TIPO = TIPO;
            this.ITINERARY_ID = ITINERARY_ID;
            this.COORD = COORD;
            this.table = table;
    }

}
