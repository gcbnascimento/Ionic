import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/api-provider';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

 
  lista : any = [];
  limit : number = 10;
  start : number = 0;
  usuario : number;
  dadosLogin: any;
  id_curso: number;
  descricao: string;
  
  
 
   constructor(
     private router: Router,  
     private provider: PostProvider,
     private storage: NativeStorage,
     public toastController: ToastController,
     private actRoute: ActivatedRoute
   
   ) { }
 
   ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      this.id_curso = data.id_curso;
      this.descricao = data.descricao;      
      console.log(data);
      this.doRefreshpage(event);
    });

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

   //atualizar o list view ao entrar na página
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
       id_curso : this.id_curso,
      
     };
     this.provider.Api(dados, 'apiNotas.php').subscribe(data => {
       for(let dado of data['result']){
         this.lista.push(dado);
       }
       resolve(true);
     });
 
   });
 
 }
 
 
 
 voltar(){
  this.router.navigate(['/cursos'])
}

 
}
