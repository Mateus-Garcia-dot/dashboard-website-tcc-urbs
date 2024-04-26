export class Pontos {
    
    codigo: number;
    nome: string;
    tipo: string;
    grupo: string;
    latitude: number;
    longitude: number;

    constructor(codigo: number, nome: string, tipo: string, grupo: string, latitude: number, longitude: number) {
        this.codigo = codigo;
        this.nome = nome;
        this.tipo = tipo;
        this.grupo = grupo;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
