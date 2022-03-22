export class Spell {
    
    public idSpell: number;
    public spellName: string;
    public description: string;

    constructor(idSpell: number, spellName: string, description: string) {
        this.idSpell = idSpell;
        this.spellName = spellName;
        this.description = description;
    }
    
}
