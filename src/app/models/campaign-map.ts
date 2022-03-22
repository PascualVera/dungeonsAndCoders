export class CampaignMap {
    
    public idCampaignMap: number;
    public mapName: string;
    public urlMap: string;
    public idCampaignPre: number;

    constructor(idCampaignMap: number, mapName: string, urlMap: string, idCampaignPre: number) {
        this.idCampaignMap =  idCampaignMap;
        this.mapName =  mapName;
        this.urlMap =  urlMap;
        this.idCampaignPre =  idCampaignPre;
    }
    
}
