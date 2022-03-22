import { Injectable } from '@angular/core';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public characters: Character[]
  public character: Character
  public life:number
  constructor() {
    
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
        +12,
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
    this.character = this.characters[0]
    this.life = this.character.golpe
   }
   
}
