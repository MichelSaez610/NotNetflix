import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeFormComponent } from "./Components/code-form/code-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CodeFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NotNetflix';
}
