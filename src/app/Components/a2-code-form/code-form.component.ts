import { Component  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SocketService} from '../../socket.service';

@Component({
  selector: 'app-code-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './code-form.component.html',
  styleUrl: './code-form.component.css'
})
export class CodeFormComponent {
  userCode: string = '';

  constructor(private socketService: SocketService) {}

  validateCode(): void {
    this.socketService.validateCode(this.userCode);

    this.socketService.onCodeValidationResult().subscribe((response: any) => {
      if (response.valid) {
        alert('Code is valid! Video controls are now enabled');
      } else {
        alert('Invalid code. Please try again');
      }
    });
  }


}
