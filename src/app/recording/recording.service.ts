/// <reference types="@types/dom-mediacapture-record" />

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {

  private recorder: MediaRecorder;
  private recordedChunks: any[] = [];

  constructor() {
    // this.recorder = null;
  }

  // Starts recording, and returns the MIME type of the recording
  startRecording(ms: MediaStream) {
    this.recordedChunks = [];
    let options = { mimeType: 'video/webm;codecs=vp9' };
    this.recorder = new MediaRecorder(ms, options);
    this.recorder.ondataavailable = this.handleDataAvailable.bind(this);
    this.recorder.start();
  }

  stopRecording() {
    this.recorder.stop();
  }

  download() {
    var blob = new Blob(this.recordedChunks, {
      type: 'video/webm'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'test.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * When data is available from the recorder, we give it to the live service that will
   * Add it to the chunk buffer + torrent seed it
   * @param event event on data available containing the blob
   */
  handleDataAvailable(event: any) {
    if (event.data.size > 0) {
      this.recordedChunks.push(event.data);
    }
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }
}
