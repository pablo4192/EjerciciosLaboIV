import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';
import { RegistroComponent } from './components/registro/registro.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { ChatComponent } from './components/chat/chat.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { PuntajesComponent } from './components/puntajes/puntajes.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FiltroChatPipe } from './pipes/filtro-chat.pipe';
import { AsignarFechaDirective } from './directives/asignar-fecha.directive';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuienSoyComponent,
    VistaPrincipalComponent,
    RegistroComponent,
    NavComponent,
    ChatComponent,
    LogoutComponent,
    PuntajesComponent,
    SpinnerComponent,
    FiltroChatPipe,
    AsignarFechaDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
