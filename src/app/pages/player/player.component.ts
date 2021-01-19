import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  allSongs: string[] = [];
  currentSongs: Array<any> = [];
  currentFile: any = {};
  up = faArrowUp;
  down = faArrowDown;
  isAdmin: boolean;
  isPlaying: boolean;
  login = {};

  constructor(private http: HttpClient) {
    // get media files
    this.isAdmin = true;
    this.isPlaying = false;
    this.login = {
      "login": "administrator",
      "password": "hello123"
    };
    // listen to stream state
  }

//  openDialog() {
//    const dialogRef = this.dialog.open(ErrorDialog);

//    dialogRef.afterClosed().subscribe(result => {
//      console.log(result);
//    })
//  }
  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNjEwODE2MDYxLCJpYXQiOjE2MTA3OTgwNjF9.dFevFFkfV4eVWQ_9_g4_EJhAgCgVLCdMIdBOG74GPowb64g-Ierb40WM8RysEXPcMFb44qrw5dljdb89sJhZBg'
      })
    };  
    this.http.get<any>(environment.API_URL + 'songs/all', httpOptions).subscribe(data => {
      this.allSongs = data;  
    },
    err => {
      console.log(err);
    })
    this.http.get<any>(environment.API_URL+ 'songs', httpOptions).subscribe(data => {
      this.currentSongs = data;  
    })
  }
  play() {
    this.isPlaying = false;
  }

  hasNext() {
    if(this.currentSongs.length == 0){
      return false;
    }
    return true;
  }
  pause() {
    this.isPlaying = true;
  }

  next() {

  }
  /**
   * return true if user is the administrator and then in combination with the 
   * input playing and whether or not the application is actually playing
   * the button pause will pause button will have playing input false, and thus will display when 
   * isplaying is also false
   * the play button will give the parameter playing true so if isplaying is true it will display
   * @param playing 
   */
  playOrPause(playing) {
    if(!this.isAdmin) {
      return false;
    }if(playing && this.isPlaying){
      return true;
    }else if(!playing && !this.isPlaying){
      return true;
    }
    return false;
  }

  openFile(file) {
    let song = { songName: file }
    let error;
    this.http.post<string>( environment.API_URL + 'songs?songName=' + file, song).subscribe(
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