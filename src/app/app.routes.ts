import { Routes } from '@angular/router';
import { A1VideoSelectorComponent } from './Components/a1-video-selector/a1-video-selector.component';
import { CodeFormComponent } from './Components/a2-code-form/code-form.component';

export const routes: Routes = [
  {path: '', component: A1VideoSelectorComponent},
  {path: 'a2Page', component: CodeFormComponent}
];
