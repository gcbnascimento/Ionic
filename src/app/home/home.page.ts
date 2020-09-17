import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PostProvider } from 'src/providers/api-provider';
import { isDate } from 'util';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: Router, private storage: NativeStorage, private provider: PostProvider, ) { }

  lista: any = [];
  usuario: number;
  dadosLogin: any;
  id_push: string;
  nome: string;



  carregar_usuario_logado() {

    this.storage.getItem('session_storage').then((res) => {
      this.dadosLogin = res;
      this.usuario = this.dadosLogin.codigo;
      this.nome = this.dadosLogin.nome;
      console.log(res);


    });


  }


  ngOnInit() {
    this.carregar_usuario_logado();
  }




  ionViewWillEnter() {


    var cod_matr: number = this.usuario;
    var idpush_id: string;

    var notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("6ff91570-bb00-462c-827f-9b71398f8f8d", "181829512203")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();


     window["plugins"].OneSignal.getIds(function (ids) {
      var matr: Number = cod_matr;
      var idpush = ids.userId;
      idpush_id = idpush
     /* alert("Este é o id do onesignal que este aparelho gerou " + idpush + " " + matr + "   "); */
    }); 

    setTimeout(() => {
      //gravar id OneSignal no banco de dados na tabela matricula 
     
        
        let dados = {
          requisicao: "gravarid",
          idpush: idpush_id,
          usuarioLogado: cod_matr,
        };
        this.provider.Api(dados, 'apiHome.php').subscribe(data => {
          for (let dado of data['result']) {
            this.lista.push(dado);
          } 
        });
    }, 2000);
  }



  notification() {
    this.route.navigate(['./notification']);
  }
  my_profile() {
    this.route.navigate(['./my-profile']);
  }
  syllabus() {
    this.route.navigate(['./syllabus']);
  }
  calender() {
    this.route.navigate(['./data']);
  }
  tests() {
    this.route.navigate(['./tests']);
  }
  insight() {
    this.route.navigate(['./insight']);
  }
  about_academy() {
    this.route.navigate(['./about-academy']);
  }
  faculties() {
    this.route.navigate(['./faculties']);
  }
  support() {
    this.route.navigate(['./support']);
  }
  faculties_message() {
    this.route.navigate(['./faculties-messages-list']);
  }
  cursos() {
    this.route.navigate(['./cursos']);
  }
}
