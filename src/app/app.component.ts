import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { Widget } from 'rasa-webchat';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UI';
}
