import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../Services/socket-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-a1-video-selector',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './a1-video-selector.component.html',
  styleUrl: './a1-video-selector.component.css'
})
export class A1VideoSelectorComponent implements OnInit {

  title: string = 'Select an Option';
  selectedOption: string = '';
  options: string[] = [];

  generatedCode: string = '';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onGeneratedCode().subscribe((code: string) => {
      this.generatedCode = code;
    });

    this.socketService.getVideos().subscribe((videos: any[]) => {
      this.options = videos.map(video => video.name);
    });
  }

  sendMessage(): void {
    if (this.selectedOption) {
        this.socketService.sendMessage(this.selectedOption);
        console.log('Sending message:', this.selectedOption);
        this.selectedOption = '';
    }
}
}

