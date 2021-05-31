import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css'],
})
export class EditNoteViewComponent implements OnInit {
  // note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  copyOfNote: Note;
  constructor(
    public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public note: Note,
    public routerService: RouterService,
    public noteService: NotesService
  ) {}
  ngOnInit(): void {
    this.copyOfNote = Object.assign({}, this.note);
    console.log(this.copyOfNote);
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        this.errMessage = err.message;
      }
    );
    this.dialogRef.close(this.note);
  }
}
