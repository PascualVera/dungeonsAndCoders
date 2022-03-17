import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css'],
})
export class CharacterSelectComponent implements OnInit {
  public scrollCount: number;
  public characters: Character[];
  constructor() {
    this.scrollCount = 0;
    this.characters = [
      new Character(
        'Rogue',
        '../../../assets/images/characters/rogue.png',
        8,
        16,
        12,
        10,
        10,
        16,
        -1,
        3,
        1,
        1,
        0,
        3,
        14,
        30,
        25,
        `Nunca tengo un plan, pero se me da bien
        improvisar sobre la marcha. Además, la
        mejor forma de que haga algo es decirme
        que no puedo hacerlo.`,
        `Gente. Soy leal a mis amigos, no a ningún
        ideal. Por lo que a mi respecta, los demás
        pueden hacer la travesía del río Estigio.`,
        `Qelline Alderleaf, mi tía, tiene una granja
        en Phandalin. Siempre le doy parte de mis
        ganancias, conseguidas ilícitamente.
        `,
        `Mi tía no debe saber jamás lo que hice
        cuando era miembro de los Carmesíes.`,
        ['Espada corta', 'Arco corto'],
        25,
        '1d8'
      ),
      new Character(
        'Warrior',
        '../../../assets/images/characters/warrior.png',
        14,
        8,
        15,
        10,
        16,
        12,
        2,
        -1,
        2,
        0,
        3,
        1,
        18,
        25,
        -1,
        `No me gusta ensuciarme. Bajo
        ningún concepto me alojaré en dependencias
        inapropiadas a mi alcurnia.`,
        `Respeto. La gente merece ser tratada con
        dignidad y cortesía.
        `,
        `Mi hacha a dos manos es una herencia
        familiar. Se trata, con mucho, de mi posesión
        más preciada`,
        `Me cuesta resistirme a la tentación de las
        riquezas, especialmente el oro. Una gran
        fortuna podría ayudarme a restaurar mi
        legado`,
        ['Escudo Grande', 'Hacha a dos manos'],
        30,
        '1d8'
      ),
      new Character(
        'Cleric',
        '../../../assets/images/characters/cleric.png',
        8,
        11,
        13,
        15,
        12,
        9,
        1,
        -1,
        2,
        0,
        3,
        1,
        11,
        25,
        2,
        `Siempre soy educada y respetuosa. Además,
        no confío en mis instintos, así que suelo
        esperar a que otros actúen primero.`,
        `Respeto. La gente merece ser tratada con
        dignidad y cortesía.`,
        `Tengo tres primos: Gundren, Tharden y
        Nundro Rockseeker. Son miembros de mi
        clan y buenos amigos.`,
        `Dudo en secreto de si los dioses realmente se
        preocupan por los asuntos de los mortales.`,
        ['Espada larga', 'Daga'],
        17,
        '1d8'
      ),
      new Character(
        'Mage',
        '../../../assets/images/characters/mage.png',
        10,
        15,
        14,
        16,
        12,
        8,
        0,
        2,
        2,
        3,
        1,
        -1,
        12,
        30,
        2,
        `Empleo polisílabos para dar la impresión
        de cultura. Además, llevo tanto tiempo en
        el templo que tengo poca experiencia en el
        trato con los demás`,
        `Conocimiento. El camino hacia el poder
        y la mejora de uno mismo pasa por el
        conocimiento`,
        `El tomo que llevo conmigo es el trabajo de
        mi vida. No existe lugar lo bastante seguro
        para albergarlo.`,
        `Haré casi cualquier cosa para descubrir
        secretos de la historia y añadirlos a mi
        investigación`,
        ['Espada Corta'],
        14,
        '1d6'
      ),
      new Character(
        'Ranger',
        '../../../assets/images/characters/archer.png',
        12,
        10,
        16,
        10,
        12,
        8,
        1,
        3,
        2,
        -2,
        0,
        1,
        14,
        30,
        2,
        ``,
        ``,
        ``,
        ``,
        ['Arco Largo', 'Espada rota'],
        18,
        '1d8'
      ),
      new Character(
        'Barbarian',
        '../../../assets/images/characters/barbarian.png',
        14,
        16,
        15,
        11,
        13,
        9,
        2,
        3,
        2,
        0,
        1,
        -1,
        14,
        3,
        25,
        `Lo que me propongo, lo cumplo. Además,
        uso palabras largas para parecer más lista.`,
        `Sinceridad. No es bueno pretender ser quien
        no eres`,
        `Algún día Thundertree volverá a ser un
        pueblo próspero. Habrá una estatua mía en
        su plaza.`,
        `Estoy convencido de la importancia de
mi destino, haciendo caso omiso de mis
defectos o la posibilidad de fracasar.`,
        ['Espadon', 'Hacha grande'],
        19,
        '1d10'
      ),
    ];
  }

  //Metodos de visual
  loreScrollDown(lore: any, buttomUp: any, buttomDown: any) {
    this.scrollCount++;
    lore.style.transform = `translateY(${this.scrollCount * -20}vh)`;
    buttomDown.disabled = this.scrollCount == 3 ? true : false;
    buttomUp.disabled = this.scrollCount == 0 ? true : false;
  }
  loreScrollUp(lore: any, buttomUp: any, buttomDown: any) {
    this.scrollCount--;
    lore.style.transform = `translateY(${this.scrollCount * -20}vh)`;
    buttomDown.disabled = this.scrollCount == 3 ? true : false;
    buttomUp.disabled = this.scrollCount == 0 ? true : false;
  }
  showCharacter(
    character: Character,
    rasgos: HTMLElement,
    ideales: HTMLElement,
    vinculos: HTMLElement,
    defectos: HTMLElement,
    name: HTMLElement,
    img: any,
    fuerzaMod: any,
    fuerza: any,
    intMod: any,
    int: any,
    dexMod: any,
    dex: any,
    sabMod: any,
    sab: any,
    constMod: any,
    constitucion: any,
    carMod: any,
    car: any,
    speed: any,
    armor: any,
    iniciativa: any,
    golpe: any,
    dados: any,
    equipo: any,
    index: number
  ) {
    let armas = '';
    for (const arma of character.equipo) {
      armas += `<div class='equipo_item'>${arma}<div>`;
    }

    rasgos.innerHTML = character.rasgos;
    ideales.innerHTML = character.ideales;
    vinculos.innerHTML = character.vinculos;
    defectos.innerHTML = character.defectos;
    name.innerHTML = character.clase;
    fuerzaMod.innerHTML = character.fuerzaMod;
    fuerza.innerHTML = character.fuerza;
    intMod.innerHTML = character.inteligenciaMod;
    int.innerHTML = character.inteligencia;
    dexMod.innerHTML = character.destrezaMod;
    dex.innerHTML = character.destreza;
    sabMod.innerHTML = character.sabiduríaMod;
    sab.innerHTML = character.sabiduría;
    constMod.innerHTML = character.constitucionMod;
    constitucion.innerHTML = character.constitucion;
    carMod.innerHTML = character.carismaMod;
    car.innerHTML = character.carisma;
    speed.innerHTML = character.velocidad;
    armor.innerHTML = character.armadura;
    iniciativa.innerHTML = character.iniciativa;
    golpe.innerHTML = character.golpe;
    dados.innerHTML = character.dados;
    equipo.innerHTML = armas;
    img.src = character.imagen;
    img.style.display = 'block';
    ////Mostrar Imagen Effects////
    this.shadow(img, index);
  }
  shadow(img: any, index: number) {
    console.log(index);
    if (index == 0) {
      img.setAttribute('class', 'imagen_rogue');
    } else if (index == 1) {
      img.setAttribute('class', 'imagen_warrior');
    } else if (index == 2) {
      img.setAttribute('class', 'imagen_cleric');
    } else if (index == 3) {
      img.setAttribute('class', 'imagen_mage');
    } else if (index == 4) {
      img.setAttribute('class', 'imagen_ranger');
    } else if (index == 5) {
      img.setAttribute('class', 'imagen_barbarian');
    }
  }
  ngOnInit(): void {}
}
