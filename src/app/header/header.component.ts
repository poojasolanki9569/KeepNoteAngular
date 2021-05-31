import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isNoteView = true;
  constructor(public routeService: RouterService) {}
  switchToList() {
    this.routeService.routeToListView();
    this.isNoteView=false;
  }
  switchToNote() {
    this.routeService.routeToNoteView();
    this.isNoteView=true;
  }
}
