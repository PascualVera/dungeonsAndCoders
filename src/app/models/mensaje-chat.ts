export class MensajeChat {
    public campaignCode: string;
    public emisor: string;
    public mensaje: string;
    public fecha: Date;

    constructor(campaignCode:string, emisor: string, mensaje: string, fecha: Date) {
        this.campaignCode = campaignCode;
        this.emisor = emisor;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }
}
