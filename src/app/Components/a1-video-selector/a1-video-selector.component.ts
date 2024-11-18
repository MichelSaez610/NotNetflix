import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-a1-video-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './a1-video-selector.component.html',
  styleUrl: './a1-video-selector.component.css'
})
export class A1VideoSelectorComponent {

  title: string = 'Select an Option';
  selectedOption: string = '';
  options: string[] = ['hola', 'que', 'tal', 'Option 4'];

  onSubmit() {
    console.log('Selected option:', this.selectedOption);
  }
}
