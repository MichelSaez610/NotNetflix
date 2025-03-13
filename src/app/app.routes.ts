import { Routes } from '@angular/router';
import { A1VideoSelectorComponent } from './Components/a1-video-selector/a1-video-selector.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'VideoSelector', component: A1VideoSelectorComponent}
];
