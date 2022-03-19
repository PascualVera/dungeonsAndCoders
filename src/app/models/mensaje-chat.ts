export class MensajeChat {
    public emisor: string;
    public mensaje: string;
    public fecha: Date;

    constructor(emisor: string, mensaje: string, fecha: Date) {
        this.emisor = emisor;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }
}
