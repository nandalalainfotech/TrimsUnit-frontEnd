import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'login';
  devicsXs: boolean = false;
  mediaSub!: Subscription;
  constructor(public MediaObserver: MediaObserver) { }
  ngOnInit() {
    this.mediaSub = this.MediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.devicsXs = result.mqAlias === 'xs' ? true : false;
      }
    )
  }
  
  ngOnDestroy() {
    this.mediaSub.unsubscribe()
  }

}
