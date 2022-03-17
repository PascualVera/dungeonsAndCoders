export class Character {
  constructor(
    public clase: string,
    public imagen: string,
    public fuerza: number,
    public destreza: number,
    public constitucion: number,
    public inteligencia: number,
    public sabiduría: number,
    public carisma: number,
    public fuerzaMod: number,
    public destrezaMod: number,
    public constitucionMod: number,
    public inteligenciaMod: number,
    public sabiduríaMod: number,
    public carismaMod: number,
    public armadura: number,
    public velocidad: number,
    public iniciativa: number,
    public rasgos: string,
    public ideales: string,
    public vinculos: string,
    public defectos: string,
    public equipo: string[],
    public golpe: number,
    public dados: string
  ) {}
}
