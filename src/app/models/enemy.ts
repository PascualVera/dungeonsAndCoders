export class Enemy {

    constructor(
        public clase: string,
        public armadura: number,
        public golpe: number,
        public velocidad: number,
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
        public habilidad: string[],
        public sentidos: string,
        public idiomas: string[],
        public rasgos: string[],
        public acciones: string[]
      ) {}
}
