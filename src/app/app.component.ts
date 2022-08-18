import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // loadedFeature = 'recipe'; // making it a reference to what is inside of header.component.html

  // onNavigate(feature: string){
  //     this.loadedFeature = feature;
  // };
  constructor( private auth: AuthService ){};

  ngOnInit(): void {
      this.auth.autoLogin();
  };

};
