import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, private inappBrowser: InAppBrowser) {

  }

  items: string[] = [];

  openItem(item: string) {

    const options: InAppBrowserOptions = {};

    this.inappBrowser.create(`googlechrome://navigate?url=${item}`, '_system', );
  }

  private handleSave(data: MediaFile[] | CaptureError) {
    if (Array.isArray(data)) {
      const mediaFile = (data as MediaFile[])[0];
      this.items.unshift(mediaFile.fullPath);
    } else {
      var error = data as CaptureError;
      alert('error: ' + error.code);
    }
  }

  private handleError(err: any) {
    alert('error: ' + err);
  }

  recordVideo() {
    this.mediaCapture.captureVideo()
      .then(result => this.handleSave(result))
      .catch(err => this.handleError(err));
  }

  recordAudio() {
    this.mediaCapture.captureAudio()
      .then(result => this.handleSave(result))
      .catch(err => this.handleError(err));
  }

  recordImage() {
    this.mediaCapture.captureImage()
      .then(result => this.handleSave(result))
      .catch(err => this.handleError(err));
  }

}
