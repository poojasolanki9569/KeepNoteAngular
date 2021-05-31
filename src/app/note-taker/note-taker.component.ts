import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css'],
})
export class NoteTakerComponent {
  errMessage: string;
  note: Note;
  constructor(public noteService: NotesService) {
    this.note = new Note();
  }
  takeANote() {
    if (this.note.title !== '' && this.note.text !== '') {
      this.noteService.addNote(this.note).subscribe(
        (result) => {},
        (error) => {
          this.errMessage = error.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
