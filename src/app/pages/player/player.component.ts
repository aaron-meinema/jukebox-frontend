import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StreamState } from '../../interfaces/stream-state';
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
  

  constructor(private http: HttpClient) {
    // get media files

    // listen to stream state
  }
//  openDialog() {
//    const dialogRef = this.dialog.open(ErrorDialog);

//    dialogRef.afterClosed().subscribe(result => {
//      console.log(result);
//    })
//  }
  ngOnInit() {
    this.http.get<any>('http://localhost:8080/farm_system_war_exploded/songs/all').subscribe(data => {
      this.allSongs = data;  
    })
    this.http.get<any>('http://localhost:8080/farm_system_war_exploded/songs').subscribe(data => {
      this.currentSongs = data;  
    })
  }
  play() {

  }

  pause() {

  }

  isPlaying() {
    
  }

  openFile(file) {
    let song = { songName: file }
    let error;
    this.http.post<string>('http://localhost:8080/farm_system_war_exploded/songs?songName=' + file, song).subscribe(
      err => {error = err}
    );
    if(error.status != 200) {
      //this.openDialog();
    }
  }
}
//@Component({
//  selector: 'error.dialog',
//  templateUrl: 'error.dialog.html',
//})
//export class ErrorDialog {}