import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoraPage } from './hora.page';

describe('HoraPage', () => {
  let component: HoraPage;
  let fixture: ComponentFixture<HoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
