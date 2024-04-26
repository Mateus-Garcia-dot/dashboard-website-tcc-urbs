export class Shape {

    constructor(sentido: string, latitude: number, longitude: number) {
        this.sentido = sentido;
        this.lat = latitude;
        this.lng = longitude;
    }

    sentido: string;
    lat: number;
    lng: number;
}