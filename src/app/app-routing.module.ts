import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaingSelectComponent } from './pages/campaing-select/campaing-select.component';
import { CampaingComponent } from './pages/campaing/campaing.component';
import { CharacterSelectComponent } from './pages/character-select/character-select.component';
import { CreditosComponent } from './pages/creditos/creditos.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { VistaMasterComponent } from './pages/vista-master/vista-master.component';
import { VistaPlayerComponent } from './pages/vista-player/vista-player.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component:LoginComponent },
  { path: 'inicio', component:HomePageComponent },
  { path: 'campaing', component:CampaingComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'campaingDetails', component:CampaingSelectComponent },
  { path: 'characterList', component: CharacterSelectComponent },
  { path: 'master', component: VistaMasterComponent },
  { path: 'player', component: VistaPlayerComponent },
  { path: 'creditos', component: CreditosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
