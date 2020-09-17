import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/api-provider';
import { ToastController, IonContent} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ElementSchemaRegistry } from '@angular/compiler';



@Component({
  selector: 'app-faculties-message',
  templateUrl: './faculties-message.page.html',
  styleUrls: ['./faculties-message.page.scss'],
})
export class FacultiesMessagePage implements OnInit {

  nomeBusca : string;
  lista : any = [];
  limit : number = 10;
  start : number = 0;
  usuario : number;
  dadosLogin: any;
  mensagem: string;  
  
 
  //@ViewChild(Content) content: Content;
  @ViewChild(IonContent,{static: true}) content: IonContent;

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

  ScrollToBottom(){
    this.content.scrollToBottom(1000);
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
        this.ScrollToBottom();         
        event.target.complete();              
      }, 500);
    
  }

  //atializar list view ao entrar na página
  doRefreshpage(event) {
    
   setTimeout(() => {
     this.ionViewWillEnter();         
     event.target.complete();
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
    this.provider.Api(dados, 'apiMensagem.php').subscribe(data => {
      for(let dado of data['result']){
        this.lista.push(dado);
      }
      resolve(true);
    });
    this.mensagem = null;  
    this.ScrollToBottom();  
  });
     

}


enviarmsg(){
  return new Promise(resolve => {
    if(this.mensagem != null){
    let dados = {
      requisicao : 'enviarmsg',
      limit : this.limit,
      start : this.start,
      usuarioLogado : this.usuario,
      mensagem : this.mensagem,
     
    };
    this.provider.Api(dados, 'apiMensagem.php').subscribe(data => {
      for(let dado of data['result']){
        this.lista.push(dado);
      }
      resolve(true);
      this.mensagem = "";      
      this.doRefresh(event);
    });
  }else{
    console.log("Campo vazio");
    
  }
  });
    

}
}
