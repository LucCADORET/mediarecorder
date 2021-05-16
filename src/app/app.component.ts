import { Component } from '@angular/core';
import { RecordingStateEnum } from './enums/recording-state.enum';
import { RecordingService } from './recording/recording.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'media-recorder';
  recordingState: RecordingStateEnum;

  constructor(private recordingService: RecordingService) {
    this.recordingState = RecordingStateEnum.NONE;
  }

  startRecording() {
    let displayMediaOptions = {
      video: true,
      audio: true
    };
    const mediaDevices = navigator.mediaDevices as any; // Workaround for typescript warning

    // Capture the user media
    mediaDevices.getDisplayMedia(displayMediaOptions).then((ms: MediaStream) => {
      this.recordingService.startRecording(ms);
      this.recordingState = RecordingStateEnum.RECORDING;
    });
  }

  stopRecording() {
    this.recordingService.stopRecording();
    this.recordingState = RecordingStateEnum.RECORDED;
  }

  download() {
    this.recordingService.download();
  }
}
