import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/api-provider';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  datah:string;
  

  optionsSemana: CalendarComponentOptions = {
    weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthPickerFormat: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO','SET','OUT', 'NOV','DEZ']
    };


  constructor(
    private router: Router,  
    private provider: PostProvider,
    private storage: NativeStorage,
    public toastController: ToastController,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  hora(datah){    
  this.router.navigate(['/hora/' + datah]);
}
voltar(){

  this.router.navigate(['/home/']);
}
}
