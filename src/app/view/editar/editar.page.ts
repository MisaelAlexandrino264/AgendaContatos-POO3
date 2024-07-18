import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Contato from 'src/app/model/entities/Contato';
import { ContatoService } from 'src/app/model/services/contato.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  contato: Contato;
  nome: string;
  telefone: string;
  email: string;
  genero: number;
  edicao: boolean = false;


  constructor(private contatoService: ContatoService,private firebaseService: FirebaseService ,private router: Router) {
    
   }

  ngOnInit() {
    this.contato = history.state.contato;
    if(this.contato){
      this.nome = this.contato.nome;
      this.telefone = this.contato.telefone;
      this.email = this.contato.email;
      this.genero = this.contato.genero;
    }
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
    this.firebaseService.excluir(this.contato)
    .then(()=>{
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      console.log(error);
    
    })
  }
  salvar(){
    let novo : Contato = new Contato(this.nome, this.telefone);
    novo.email = this.email;
    novo.genero = this.genero;
    //alert de validação
    this.firebaseService.editar(this.contato.id, novo)
    .then(()=>{
      this.router.navigate(['/home']);
    })
    .catch((error)=>{
      console.log(error);
    
    })
  
  }

}
