export class Weapon {

    public idEquip: number;
    public nameEquip: string;
    public bonusEquip: number;
    public damageType: string;
    public anotacion: string;

    constructor(idEquip: number, nameEquip: string, bonusEquip: number, damageType: string, anotacion: string) {
        this.idEquip = idEquip;
        this.nameEquip = nameEquip;
        this.bonusEquip = bonusEquip;
        this.damageType = damageType;
        this.anotacion = anotacion;
    }
    
}
