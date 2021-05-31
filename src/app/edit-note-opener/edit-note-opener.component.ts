import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  template: '',
})
export class EditNoteOpenerComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public routerService: RouterService,
    public noteService: NotesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id: number = +this.activatedRoute.snapshot.paramMap.get('noteId');
    const note: Note = this.noteService.getNoteById(id);
    setTimeout(() =>
      this.dialog
        .open(EditNoteViewComponent, {
          width: '400px',
          data: note,
        })
        .afterClosed()
        .subscribe((result: Note) => {
          this.routerService.routeBack();
        })
    );
  }
}
