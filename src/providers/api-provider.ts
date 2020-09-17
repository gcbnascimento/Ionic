import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider{

  //quando for testar no android troque o ip abaixo para o da sua maquina, e também troque o ip no arquivo /resources/android/xml/network_security_config.xml
    server: string = "http://192.168.0.73/apialuno/";

    constructor(private http : HttpClient){

    }


    Api(dados: any, api: string){

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          };
       
            let url = this.server + api ;
           return this.http.post(url, JSON.stringify(dados), httpOptions)
            .map(res => res);
       
    
  }        
  }