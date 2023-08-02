import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  SPINNER,
  POSITION,
  PB_DIRECTION } from 'ngx-ui-loader';

import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { TokenInterceptorService } from './services/Token-Interceptor.service';
import { ApiUrlService } from './services/ApiUrls.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login-component/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './components/register/register.component';
import { DataRepositoryService } from './services/DataRepository.service';
import { AdminModule } from './components/Admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UserhomepageComponent } from './components/users/userhomepage/userhomepage.component';
import { PatientComponent } from './components/users/patient/patient.component';
import { MatCardModule } from '@angular/material/card';
import { ThanksComponent } from './components/users/thanks/thanks.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig={
  "bgsColor": "#1fe909",
  "bgsOpacity": 0.5,
  "bgsPosition": "center-left",
  "bgsSize": 100,
  "bgsType": "three-strings",
  "blur": 15,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": 'red',
  "fgsPosition": "center-center",
  "fgsSize": 100,
  "fgsType": "three-strings",
  "gap": -80,
  "logoPosition": "center-center",
  "logoSize": 60,
  "logoUrl": "assets/loader.png",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
  }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    UserhomepageComponent,
    HeaderComponent,
    RegisterComponent,
    PatientComponent,
    ThanksComponent,





  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    AgGridModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    AppRoutingModule,
    AdminModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),

  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    ApiUrlService,
    DataRepositoryService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
