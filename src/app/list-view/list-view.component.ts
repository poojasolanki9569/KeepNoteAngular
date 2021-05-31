import { Component, OnInit } from '@angular/core';
import { elementAt, filter, map } from 'rxjs/operators';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  // notes: Array<Note> = [];
  // note: Note;

  constructor(public noteService: NotesService) {
    // this.note = new Note();
  }

  ngOnInit(): void {
    this.noteService
      .getNotes()
      .pipe(
        map((note) => {
          this.notStartedNotes = note.filter(
            (note) => note.state === 'not-started'
          );
          this.startedNotes = note.filter((note) => note.state === 'started');
          this.completedNotes = note.filter(
            (note) => note.state === 'completed'
          );
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
