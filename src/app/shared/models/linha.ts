export class Linha {

    constructor(COD: number, NOME: string, SOMENTE_CARTAO: boolean, CATEGORIA_SERVICO: string, NOME_COR: string, empresa: string) {
        this.COD = COD;
        this.NOME = NOME;
        this.SOMENTE_CARTAO = SOMENTE_CARTAO;
        this.CATEGORIA_SERVICO = CATEGORIA_SERVICO;
        this.NOME_COR = NOME_COR;
        this.empresa = empresa;
    }

    COD: number;
    NOME: string;
    SOMENTE_CARTAO: boolean;
    CATEGORIA_SERVICO: string;
    NOME_COR: string;
    empresa: string;

}