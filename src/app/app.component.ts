import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadedFeature = 'recipe'; // making it a reference to what is inside of header.component.html

  onNavigate(feature: string){
      this.loadedFeature = feature;
  };

};
