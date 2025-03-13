import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { A1VideoSelectorComponent } from "./Components/a1-video-selector/a1-video-selector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, A1VideoSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'NotNetflix';
}
