import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {environment} from 'src/environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../login/login.service';
import {PlayerForm} from './playerForm';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {
  allSongs: string[] = [];
  currentSongs: Array<any> = [];
  playingSong: string;
  currentFile: any = {};
  up = faArrowUp;
  down = faArrowDown;
  isAdmin: string;
  isPlaying: boolean;
  disablePlay: boolean;
  form: FormGroup;
  votes: Array<any> = [];
  song: File;

  constructor(private http: HttpClient, private loginService: LoginService, private formBuilder: FormBuilder) {
    // get media files
    this.isAdmin = loginService.getRole();
    // listen to stream state
  }

  ngOnInit() {
    this.http.get<any>(environment.API_URL + 'songs/all').subscribe(data => {
        this.allSongs = data;
      },
      err => {
        console.log(err);
      });
    this.http.get(environment.API_URL + 'songs/current').subscribe(data =>{
      this.playingSong = data.toString();
    })
    this.http.get<any>(environment.API_URL + 'songs').subscribe(data => {
      this.currentSongs = data;
    });
    this.http.get<any>(environment.API_URL + 'vote').subscribe(data => {
      this.votes = data;
    });
    this.form = this.formBuilder.group({
      song: [null],
    });
  }

  upload(form: FormGroup) {
    this.http.post(`${environment.API_URL}files`, new PlayerForm(form));
    this.http.get(environment.API_URL + 'songs/command').subscribe(data => {
      this.playState(data.toString());
    });
    
  }

  private playState(command: string) {
    console.log(command)
    if(command === "playing") { //display pause button
      this.isPlaying = true;
      this.disablePlay = false;
    }else if(command === "paused"){// display play button
      this.isPlaying = false;
      this.disablePlay = false;
    }else if(this.currentSongs.length == 0){ //grey out the play button
      this.isPlaying = false;
      this.disablePlay = true;
    } else {
      this.isPlaying = false;
      this.disablePlay = false;
    }
  }

  play() {
    this.http.post<any>(environment.API_URL + 'songs/command?command=play', {}).subscribe( response => {
      this.ngOnInit();
    });
  }

  hasNext() {
    if (this.currentSongs.length == 0) {
      return false;
    }
    return true;
  }

  pause() {
    this.http.post<any>(environment.API_URL + 'songs/command?command=pause', {}).subscribe( response => {
      this.ngOnInit();
    });
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
    if (this.isAdmin !== 'ADMIN') {
      return false;
    }
    if (playing && this.isPlaying) {
      return false;
    } else if (!playing && !this.isPlaying) {
      return false;
    }
    return true;
  }

  disable() {
    return this.disablePlay;
  }

  vote(songName: string, up: boolean) {
    this.http.post(environment.API_URL + 'vote', {songName: songName, up: up}).subscribe(respone => {
      this.ngOnInit();
    });
  }

  delete(songName) {
    this.http.delete(environment.API_URL + 'vote/?songName=' + songName, {}).subscribe(response => {
      this.ngOnInit();
    });
  }
  update(songName: string, up: boolean) {
    this.http.put<any>(environment.API_URL + 'vote', {songName: songName, up: up}).subscribe( response =>{
      this.ngOnInit();
    });
  }
  
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
  hasVoted(songName) {
    for(let element of this.votes){
      if(element['songName'] === songName){
        return true;
      }
    }
    return false;
  }

  isVote(songName) {
    for(let element of this.votes) {
      if(element['songName'] === songName){
        return element['up'];
      }
  }
}
  

  openFile(file) {
    let song = {songName: file};
    let error;
    this.http.post<string>(environment.API_URL + 'songs?songName=' + file, song).subscribe(response =>{
      this.ngOnInit();
    });
  }
}