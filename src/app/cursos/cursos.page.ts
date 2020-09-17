import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/api-provider';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  
  nomeBusca : string;
  lista : any = [];
  limit : number = 10;
  start : number = 0;
  usuario : number;
  dadosLogin: any;
  
  
 
   constructor(
     private router: Router,  
     private provider: PostProvider,
     private storage: NativeStorage,
     public toastController: ToastController
   
   ) { }
 
   ngOnInit() {
    this.doRefreshpage(event);
   }
 
 
   async MensagemErro() {
     const toast = await this.toastController.create({
       message: 'Registro não encontrado!',
       duration: 2000,
       color: 'danger'
     });
     toast.present();
   }
   
 
   ionViewWillEnter(){

    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.usuario = this.dadosLogin.codigo;
      console.log(res);

    
    });

    
     this.lista = [];
     this.start = 0;
     this.carregar();
   }
 
 
   //atualizar o list view
 
   doRefresh(event) {
     
     setTimeout(() => {
       this.ionViewWillEnter();
       event.target.complete();
     }, 500);
   }

   //atializar list view ao entrar na página
   doRefreshpage(event) {
     
    setTimeout(() => {
      this.ionViewWillEnter();
      //event.target.complete();
    }, 500);
  }
 
 
 
 carregar(){
   return new Promise(resolve => {
     let dados = {
       requisicao : 'listar',
       limit : this.limit,
       start : this.start,
       usuarioLogado : this.usuario,
      
     };
     this.provider.Api(dados, 'apiCursos.php').subscribe(data => {
       for(let dado of data['result']){
         this.lista.push(dado);
       }
       resolve(true);
     });
 
   });
      
 
 }
 
 notas(id_curso, descricao){

  this.router.navigate(['/notas/' + id_curso + '/' + descricao]);

 }

}
