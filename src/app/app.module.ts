import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CampaingComponent } from './pages/campaing/campaing.component';
import { CampaingSelectComponent } from './pages/campaing-select/campaing-select.component';
import { CharacterSelectComponent } from './pages/character-select/character-select.component';
import { VistaMasterComponent } from './pages/vista-master/vista-master.component';
import { VistaPlayerComponent } from './pages/vista-player/vista-player.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { CharacterComponent } from './components/character/character.component';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { DadosComponent } from './components/dados/dados.component';
import { HttpClientModule} from '@angular/common/http'

// Idioma Español
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomePageComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    CampaingComponent,
    CampaingSelectComponent,
    CharacterSelectComponent,
    VistaMasterComponent,
    VistaPlayerComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    CharacterComponent,
    GameHeaderComponent,
    DadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
