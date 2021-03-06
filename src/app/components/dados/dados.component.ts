import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Dado } from 'src/app/models/dado';
import { Tirada } from 'src/app/models/tirada';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  @Output() onEnviarValor = new EventEmitter<Tirada>();
  @ViewChild('des') des!: ElementRef;
  @ViewChild('faces') faces!: ElementRef;

  public imgDado!:string;
  public arrayDados: Dado[] = [];
  public arrayD6: string [] = [];
  public numDados: number[] = [];
  public sumDados: number = 0;
  public valor: number = 0;
  public status: boolean = false;
  public lanzado: boolean = false;
  public tirada: Tirada = new Tirada();
  
  constructor() {}

enviarValor()
{
  this.tirada.cantidad = this.des.nativeElement.value;
  this.tirada.caras = this.faces.nativeElement.value;
  this.tirada.valor = this.sumDados;
  this.onEnviarValor.emit(this.tirada);
  this.resetDados();
}

resetDados() {
  this.imgDado = "";
  this.arrayDados = [];
  this.arrayD6 = [];
  this.numDados = [];
  this.sumDados = 0;
  this.valor = 0;
  this.status = false;
  this.lanzado = false;
  this.tirada = new Tirada();
}

 lanzarDados():any 
 {
    let des = this.des.nativeElement.value;
    let faces = this.faces.nativeElement.value;
     if(faces == 6)
     {
      this.arrayD6 = []
      this.sumDados = 0; 
       for(let i=0; i<des; i++)
       {
        
        this.valor = Math.floor(Math.random()*6+1);
        this.imgDado="../../../assets/images/dados/dadoD6/"+this.valor+"-6-caras.png";
        this.arrayD6.push(this.imgDado);
        this.sumDados += this.valor;
       }  
     }
    else if(faces == 20)
    {
      this.arrayDados = []
      this.numDados = []
      this.sumDados = 0; 
        for(let i=0; i<des; i++)
        {
        this.valor = Math.floor(Math.random()*20+1);
        this.imgDado="../../../assets/images/dados/dado-20-caras.png";
        this.arrayDados.push({'img': this.imgDado, 'valor': this.valor});
        this.numDados.push(this.valor)
        this.sumDados += this.valor;
        }
    }
    else if(faces == 4)
    {
      this.arrayDados = []
      this.numDados = []
      this.sumDados = 0; 
        for(let i=0; i<des; i++)
        {
        this.valor = Math.floor(Math.random()*4+1);
        this.imgDado="../../../assets/images/dados/dado-4-caras.png";
        this.arrayDados.push({'img': this.imgDado, 'valor': this.valor});
        this.numDados.push(this.valor)
        this.sumDados += this.valor;
        }
    }
    else if(faces == 8)
    {
      this.arrayDados = []
      this.numDados = []
      this.sumDados = 0; 
        for(let i=0; i<des; i++)
        {
        this.valor = Math.floor(Math.random()*8+1);
        this.imgDado="../../../assets/images/dados/dado-8-caras.png";
        this.arrayDados.push({'img': this.imgDado, 'valor': this.valor});
        this.numDados.push(this.valor)
        this.sumDados += this.valor;
        }
    }
    else if(faces == 10)
    {
      this.arrayDados = []
      this.numDados = []
      this.sumDados = 0; 
        for(let i=0; i<des; i++)
        {
        this.valor = Math.floor(Math.random()*10+1);
        this.imgDado="../../../assets/images/dados/dado-10-caras.png";
        this.arrayDados.push({'img': this.imgDado, 'valor': this.valor});
        this.numDados.push(this.valor)
        this.sumDados += this.valor;
        }
    }
    else if(faces == 12)
    {
      this.arrayDados = []
      this.numDados = []
      this.sumDados = 0; 
        for(let i=0; i<des; i++)
        {
        this.valor = Math.floor(Math.random()*12+1);
        this.imgDado="../../../assets/images/dados/dado-12-caras.png";
        this.arrayDados.push({'img': this.imgDado, 'valor': this.valor});
        this.numDados.push(this.valor)
        this.sumDados += this.valor;
        }
    }
    
    this.lanzado = true;
    this.status = true;
 }

 cerrarModal()
 {   
    this.sumDados = 0;  
    this.enviarValor()
 }


  ngOnInit(): void {
  }

}
