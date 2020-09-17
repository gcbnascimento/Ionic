import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/api-provider';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {

  //Variaveis
  nome : string;
  matricula : number;
  senha : string;
  id_cliente : number;

  constructor(
	  private router: Router,
    private provider:PostProvider,
    private storage: NativeStorage,
    public toast: ToastController
	) { }

  ngOnInit() {
  }

  async login(){
    
    if(this.matricula == null ){

          const toast = await this.toast.create({
          message: 'Preencha o Usuário',
          duration: 2000,
          color: 'warning'
        });
        
        toast.present();
        return;
      }

      if(this.senha == "" ){

        const toast = await this.toast.create({
        message: 'Preencha a Senha',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }


    let dados = {
      requisicao : 'login',
      matricula: this.matricula,
      senha: this.senha,  
      nome: this.nome,  
      id_cliente: this.id_cliente  
    };

    this.provider.Api(dados, 'login.php').subscribe(async data => {
     var alert = data['msg'];
     if(data['success']){
       this.storage.setItem('session_storage', data['result']);
       this.router.navigate(['/home']);
       const toast = await this.toast.create({
         message: 'Logado com Sucesso',
         duration: 2000,
         color: 'success'
       });
       toast.present();
       this.matricula = null;
       this.senha = "";
       console.log(data);
     }else{
      const toast = await this.toast.create({
        message: alert,
        duration: 2000,
        color: 'danger'
      });
      toast.present();
     }
      
    });

    }


	
 goToForgotPassword() {
    //this.route.navigate(['./forgot-password']);
    //this.navCtrl.navigateRoot(['./forgot-password']);
  } 
	
  
  goToSignUP() {
    //this.navCtrl.navigateRoot(['./sing-up']);
    
  } 

}
