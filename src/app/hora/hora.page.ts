import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/api-provider';
import { ToastController, AngularDelegate } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.page.html',
  styleUrls: ['./hora.page.scss'],
})
export class HoraPage implements OnInit {

  alert: string;
  datah: string;
  dadosLogin: any;
  usuario : number;
  lista : any = [];
  lista_m : any = [];
  listateste : any = [];
  start : number = 0;
  id_cliente:  number = 0;
  nr : any = [];
  nt : any = [];
  reposicaopresente : number;
  aulasfalta: number;
  nreposicao: number;
  aulasagendadas: number;
  constructor(
    private router: Router,  
     private provider: PostProvider,
     private storage: NativeStorage,
     public toast: ToastController,
     private actRoute: ActivatedRoute,
     public loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.actRoute.params.subscribe((data: any)=>{
      this.datah = data.datah;
      //this.id_cliente = data.id_cliente;    
      console.log(data);
      this.doRefreshpage(event);
      
  })
  }


  ionViewWillEnter(){

    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.usuario = this.dadosLogin.codigo;
      this.id_cliente = this.dadosLogin.id_cliente;
      console.log(res);
       });

     
     this.lista = [];
     this.nr = [];
     this.start = 0;
     this.carregar();
     this.carregar_reposicao();
     
   }

  carregar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'listar',
        usuarioLogado : this.usuario,
        datah : this.datah,
        id_cliente : this.id_cliente,        
       
      };
      this.provider.Api(dados, 'apiHora.php').subscribe(data => {
                for(let dado of data['result']){
          this.lista.push(dado);
        }  
        for(let total_maquina_dis of data['total_maquina_dis']){
          this.lista_m.push(total_maquina_dis);
        }
                      
        resolve(true);
      });
  
    });
    
  
  }
//Carega o número de reposição que o aluno possui 
  carregar_reposicao(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'reposicao',
        usuarioLogado : this.usuario,
        datah: this.datah,
        
      };
      this.provider.Api(dados, 'apiHora.php').subscribe(data => {
        for(let dado of data['result']){
          this.nr.push(dado);
         
          this.reposicaopresente = parseInt(dado.quantidaderp);
        
        }
        for(let dado1 of data['result2']){
          this.nt.push(dado1);
          this.aulasfalta = parseInt(dado1.quantidadeaula);
         
          
        }
        for(let dado2 of data['result3']){
          this.nt.push(dado2);
          this.aulasagendadas = parseInt(dado2);
         
          
        }
        if(this.reposicaopresente >= this.aulasfalta){

          this.nreposicao = 0;
        }else{
          this.nreposicao =  (this.aulasfalta - this.reposicaopresente) - this.aulasagendadas;
        }        
        resolve(true);
      });
  
    });

       
  
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
    }, 500);
  }


async agendar(codigohorario, soma, datah) {
      return new Promise(resolve => {
        let dados = {
          requisicao : 'agendar',
            usuarioLogado : this.usuario,
            datah : datah,
            id_cliente : this.id_cliente,    
            codigohorario : codigohorario,
            total_de_maquinas: soma,
            nreposicao : this.nreposicao,
        };
        this.provider.Api(dados, 'apiHora.php').subscribe(async data => { 
          var alert = data['msg'];          
          if(data['success'] == true){
          const toast = await this.toast.create({
            message: alert + " " + datah,
            duration: 2000,
            color: 'success'
          });
          this.router.navigate(['/data']);
          toast.present();
           
        }else{
          const toast = await this.toast.create({
            message: alert,
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
        
          
        });
        resolve(true); 
    
      });
      

     /* //Configuração da janela de carregamento
        const loading = await this.loadingController.create({
       message: 'Um momento, estamos agendando seu horário :)',    
       duration: 4000
       });

      //Chamada da janela de carregamento
      await loading.present();
*/




}

  voltar(){
    this.router.navigate(['/data'])
  }

}
