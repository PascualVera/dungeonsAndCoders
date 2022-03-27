export class EnemyHitPoints {

    public idEnemy: number;
    public idEnemyPre: number;
    public name:string;
    public hitPoints: number
    constructor(idEnemy: number,idEnemyPre: number,name:string,hitPoints: number){
        this.idEnemy = idEnemy;
        this.idEnemyPre = idEnemyPre;
        this.name = name;
        this.hitPoints = hitPoints;
    }
}
