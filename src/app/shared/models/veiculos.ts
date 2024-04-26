export class Veiculos {

    codigo: number;
    tipo: string;
    situacao: string;
    adaptado: string;
    latitude: number;
    longitude: number;

    constructor(codigo: number, tipo: string, situacao: string, adaptado: string, latitude: number, longitude: number,) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.situacao = situacao;
        this.adaptado = adaptado;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
