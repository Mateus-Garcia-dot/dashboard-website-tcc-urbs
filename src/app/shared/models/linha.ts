export class Linha {

    constructor(codigo: number, nome: string, somenteCartao: boolean, categoria: string, empresa: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.somenteCartao = somenteCartao;
        this.categoria = categoria;
        this.empresa = empresa;
    }

    codigo: number;
    nome: string;
    somenteCartao: boolean;
    categoria: string;
    empresa: string;

}