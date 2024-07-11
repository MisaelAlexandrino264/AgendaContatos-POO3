import { Injectable } from '@angular/core';
import Contato from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  contatos : any[] = [];

  constructor() {
    let c1: Contato = new Contato("Carlos Eduardo","42991094415");
    let c2: Contato = new Contato( "Jotair Jr","42991094400");
    let c3: Contato = new Contato( "Giovane Galvão","42991090000");
    this.contatos.push(c1);
    this.contatos.push(c2);
    this.contatos.push(c3);
  }

  obterTodos() : Contato[]{
    return this.contatos;
  }
  obterPorIndice(indice: number) : Contato{
    return this.contatos[indice];
  }
  cadastrar(contato: Contato){
    this.contatos.push(contato);
  }
  editar(indice: number, contato: Contato){
    this.contatos[indice] = contato;
  }
  excluir(indice: number){
    this.contatos.splice(indice,1);
  }

}
