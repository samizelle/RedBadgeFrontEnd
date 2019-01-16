import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event } from '../models/Event';

const apiUrl = 'https://localhost:44311'


@Injectable({
  providedIn: 'root'
})
export class AdmincontrolService {

  constructor(private http: HttpClient) { }

  getAll(user: any): Observable<User[]> {
    return this.http.get<User[]>(`${apiUrl}/admin/user`)
  }
  getAllevent(event: any): Observable<Event[]> {
    return this.http.get<Event[]>(`${apiUrl}/admin/event`)
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    return this.http.delete<User>(`${apiUrl}/admin/user/${id}`).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      //   catchError(this.handleError<any>('deleteProduct'))
    );
  }
  deleteEvent(event: Event | number): Observable<Event> {
    const idt = typeof event === 'number' ? event : event.id;
    return this.http.delete<Event>(`${apiUrl}/admin/event/${idt}`).pipe(
      tap(_ => console.log(`deleted event id=${idt}`)),
      //   catchError(this.handleError<any>('deleteProduct'))
    );
  }
  logout() {
    sessionStorage.clear();
  }
}

