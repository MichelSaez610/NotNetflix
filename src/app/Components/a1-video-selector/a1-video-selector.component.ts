import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SocketService} from '../../socket.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-a1-video-selector',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './a1-video-selector.component.html',
  styleUrl: './a1-video-selector.component.css'
})
export class A1VideoSelectorComponent implements OnInit {

  title: string = 'Select an Option';
  selectedOption: string = '';
  selectedVideo: string = '';
  options: string[] = [];
  generatedCode: string = '';
  videoControlsEnabled: boolean = false;
  videoGrayscale: boolean = true;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onGeneratedCode().subscribe((code: string) => {
      this.generatedCode = code;
    });

    this.socketService.getVideos().subscribe((videos: any[]) => {
      this.options = videos.map((video) => video.name);
    });

    this.socketService.onCodeValidationResult().subscribe((response: any) => {
      console.log('Code validation result:', response);
      if (response.valid) {
        alert('Code is valid! Video controls are now enabled');
        this.videoControlsEnabled = true;
        this.videoGrayscale = false;
      } else {
        alert('Invalid code. Please try again');
      }
    });
  }

  sendMessage(): void {
    if (this.selectedOption) {
      this.socketService.sendMessage(this.selectedOption);
      this.selectedVideo = this.selectedOption;
      this.selectedOption = '';
      this.videoControlsEnabled = false;
      this.videoGrayscale = true;
    }
  }
}

