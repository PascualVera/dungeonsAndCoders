export class Campaing {

  public idCampaign: string;
  public campaignName: string;
  public idCampaignPre: number;
  public idMaster: number;
  public date: Date;
  public numPlayer: number;
  public maxPlayer: number;
  public public: number;
  public closed: number;

  public campaignNamePre: string;
  public playerMin: number;

  constructor(public name?:string,public maps?:any[]){ // provisional para hardcorear los mapas: luego al servicio map con su endpoint

  }
}
