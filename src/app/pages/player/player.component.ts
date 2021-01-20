import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {environment} from 'src/environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {env} from 'process';
import {element} from 'protractor';
import {LoginService} from '../login/login.service';

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
  isAdmin: string;
  isPlaying: boolean;
  form: FormGroup;
  votes: Array<any> = [];

  constructor(private http: HttpClient, private loginService: LoginService) {
    // get media files
    this.isAdmin = loginService.getRole();
    this.isPlaying = false;
    // listen to stream state
  }

  ngOnInit() {
    this.http.get<any>(environment.API_URL + 'songs/all').subscribe(data => {
        this.allSongs = data;
      },
      err => {
        console.log(err);
      });
    this.http.get<any>(environment.API_URL + 'songs').subscribe(data => {
      this.currentSongs = data;
    });
    this.http.get<any>(environment.API_URL + 'vote').subscribe(data => {
      this.votes = data;
    });
  }

  play() {
    this.isPlaying = false;
    this.http.post<any>(environment.API_URL + 'songs/command?command=play', {}).subscribe();
  }

  hasNext() {
    if (this.currentSongs.length == 0) {
      return false;
    }
    return true;
  }

  pause() {
    this.isPlaying = true;
    this.http.post<any>(environment.API_URL + 'songs/command?command=pause', {}).subscribe();
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
      return true;
    } else if (!playing && !this.isPlaying) {
      return true;
    }
    return false;
  }

  vote(songName: string, up: string) {
    this.http.post<any>(environment.API_URL + 'vote/?songName=' + songName + '&up=' + up, {}).subscribe();
    this.ngOnInit();
  }

  delete(songName) {
    this.http.delete(environment.API_URL + 'vote/?songName=' + songName, {}).subscribe();
  }

  hasVoted(songName) {
    for (let element of this.votes) {
      console.log(element);
      if (element.songName === songName) {
        console.log('lol');
        return true;
      }
    }
    return false;
  }


  openFile(file) {
    let song = {songName: file};
    let error;
    this.http.post<string>(environment.API_URL + 'songs?songName=' + file, song).subscribe(
      err => {
        error = err;
      }
    );
    this.ngOnInit();
    if (error.status != 200) {
    }
  }
}
