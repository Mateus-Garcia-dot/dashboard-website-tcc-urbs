export class Veiculos {

    COD: string;
    REFRESH: string;
    LAT: string;
    LON: string;
    CODIGOLINHA: string;
    ADAPT: string;
    TIPO_VEIC: string;
    TABELA: string;
    SITUACAO: string;
    SITUACAO2: string;
    SENT: string;
    TCOUT: number;
    SENTIDO: string;

    constructor(COD: string, REFRESH: string, LAT: string, LON: string, CODIGOLINHA: string, ADAPT: string, TIPO_VEIC: string, TABELA: string, 
        SITUACAO: string, SITUACAO2: string, SENT: string, TCOUT: number, SENTIDO: string) {
      
            this.COD = COD;
            this.REFRESH = REFRESH;
            this.LAT = LAT;
            this.LON = LON;
            this.CODIGOLINHA = CODIGOLINHA;
            this.ADAPT = ADAPT;
            this.TIPO_VEIC = TIPO_VEIC;
            this.TABELA = TABELA;
            this.SITUACAO = SITUACAO;
            this.SITUACAO2 = SITUACAO2;
            this.SENT = SENT;
            this.TCOUT = TCOUT;
            this.SENTIDO = SENTIDO;
    }
}
