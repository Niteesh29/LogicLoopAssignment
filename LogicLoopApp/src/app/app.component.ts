import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet,RouterModule],
  // providers: [DataService]
})
export class AppComponent {
  title = 'LogicLoopApp';
}
