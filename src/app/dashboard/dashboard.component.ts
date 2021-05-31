import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  note: Note;
  constructor(public noteService: NotesService) {
    noteService.fetchNotesFromServer();
  }

  ngOnInit(): void {
    // console.log('dash');
  }
}
