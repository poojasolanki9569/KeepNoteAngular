import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  bearerToken: string;
  token: any;
  // authService: any;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer(): void {
    this.token = this.authService.getBearerToken();
    this.httpClient
      .get<Array<Note>>('http://localhost:3000/api/v1/notes', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      })
      .subscribe((data) => {
        this.notes = data;
        this.notesSubject.next(this.notes);
        // console.log(this.notesSubject);
      });
  }

  getNoteById(noteId): Note {
    const note = this.notes.find((note) => note.id === noteId);
    return { ...note };
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    this.token = this.authService.getBearerToken();
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    })
      .pipe(
        tap((newNote) => {
          this.notes.push(newNote);
          this.notesSubject.next(this.notes);
        })
      );
  }

  editNote(note: Note): Observable<Note> {
    this.token = this.authService.getBearerToken();
    return this.httpClient
      .put(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
      })
      .pipe(
        tap((updatedNote: Note) => {
          const noteToBeUpdated = this.notes.find(
            (note) => note.id === updatedNote.id
          );
          Object.assign(noteToBeUpdated, updatedNote);
          this.notesSubject.next(this.notes);
        })
      );
  }
}
