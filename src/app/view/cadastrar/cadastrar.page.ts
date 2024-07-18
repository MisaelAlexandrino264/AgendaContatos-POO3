import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Contato from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  formCadastrar: FormGroup;
  isSubmitted: boolean = false;


  constructor(private alertController: AlertController, private firebaseService: FirebaseService,private formBuilder: FormBuilder ,private router: Router) { }

  
  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      genero: ['', [Validators.required]],
    });
  }
  
  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.formCadastrar.valid){
      this.presentAlert('Erro ao Cadastrar','Todos os campos são Obrigatórios.');
      return false;
    }else{
      this.cadastrar();
    }
  }
  cadastrar(){
      let c: Contato = new Contato(this.formCadastrar.value['nome'],
        this.formCadastrar.value['telefone']);
      c.email = this.formCadastrar.value['email'];
      c.genero = this.formCadastrar.value['genero'];

      this.firebaseService.cadastrar(c)
      .then(()=>{
        this.router.navigate(['/home']);
      })
      .catch((error)=>{
        console.log(error);
        this.presentAlert('Erro ao Cadastrar', 'Erro ao salvar Contato');
      }) 
    
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['ok'],
    });

    await alert.present();
  }
}
