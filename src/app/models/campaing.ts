export class Campaing {

  public idCampaign: string;
  public campaignName: string;
  public numPlayer: number;
  public campaignNamePre: string;
  public playerMin: number;
  public playerMax: number;
  public public: number;

  constructor(public name?:string,public maps?:any[]){ // provisional para hardcorear los mapas: luego al servicio map con su endpoint

  }
}
