import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Contato from 'src/app/model/entities/Contato';
import { ContatoService } from 'src/app/model/services/contato.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  indice: number;
  contato: Contato;
  nome: string;
  telefone: string;
  email: string;
  genero: number;
  edicao: boolean = false;


  constructor(private contatoService: ContatoService,private router: Router ,private actRoute: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.actRoute.params.subscribe((parametros)=> {
      if(parametros["indice"]){
        this.indice = parametros["indice"];
        this.contato = this.contatoService.obterPorIndice(parametros["indice"]);
      }
    });
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
    this.email = this.contato.email;
    this.genero = this.contato.genero;
  }

  habilitar(){
    if(!this.edicao){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }

  excluir(){
    //alert de confirmação
    this.contatoService.excluir(this.indice);
    this.router.navigate(['/home']);
  }
  salvar(){
    let novo : Contato = new Contato(this.nome, this.telefone);
    novo.email = this.email;
    novo.genero = this.genero;
    //alert de validação
    this.contatoService.editar(this.indice, novo);
    this.router.navigate(['/home']);
  }

}
