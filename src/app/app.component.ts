import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeFormComponent } from "./Components/a2-code-form/code-form.component";
import { A1VideoSelectorComponent } from "./Components/a1-video-selector/a1-video-selector.component";
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CodeFormComponent, A1VideoSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'NotNetflix';
}
