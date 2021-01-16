import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AudioService } from '../../services/audio.service';
import { StreamState } from '../../interfaces/stream-state';
import {MatDialog} from '@angular/material/dialog';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  allSongs: string[] = [];
  currentSongs: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  up = faArrowUp;
  down = faArrowDown;
  

  constructor(private audioService: AudioService, private http: HttpClient, public dialog: MatDialog) {
    // get media files

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(ErrorDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  ngOnInit() {
    this.http.get<any>('http://localhost:8080/farm_system_war_exploded/songs/all').subscribe(data => {
      this.allSongs = data;  
    })
    this.http.get<any>('http://localhost:8080/farm_system_war_exploded/songs').subscribe(data => {
      this.currentSongs = data;  
    })
  }

  playStream(url) {
    this.audioService.playStream(url)
    .subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file) {
    let song = { songName: file }
    let error;
    this.http.post<string>('http://localhost:8080/farm_system_war_exploded/songs?songName=' + file, song).subscribe(
      err => {error = err}
    );
    if(error.status != 200) {
      this.openDialog();
    }
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.allSongs[index];
    this.openFile(file);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.allSongs[index];
    this.openFile(file);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.allSongs.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}

@Component({
  selector: 'error.dialog',
  templateUrl: 'error.dialog.hml',
})
export class ErrorDialog {}