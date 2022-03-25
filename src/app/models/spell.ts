export class Spell {
    
    public idSpell: number;
    public spellName: string;
    public description: string;
    public reach: string;
    public timeSpell: string;
    public duration: string;

    constructor(idSpell: number, spellName: string, description: string, reach: string, timeSpell: string, duration: string) {
        this.idSpell = idSpell;
        this.spellName = spellName;
        this.description = description;
        this.reach = reach;
        this.timeSpell = timeSpell;
        this.duration = duration;
    }
    
}
