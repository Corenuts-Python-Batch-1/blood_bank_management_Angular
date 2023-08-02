import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <ngx-ui-loader></ngx-ui-loader>
    
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
