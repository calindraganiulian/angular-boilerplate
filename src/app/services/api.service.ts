import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definim o interfață pentru a avea tipuri sigure.
// Așa știm mereu ce proprietăți are un obiect 'Post'.
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL-ul de bază al API-ului cu care vom lucra
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Injectăm HttpClient pentru a putea face request-uri HTTP
  constructor(private http: HttpClient) { }

  // READ: Preluare toate postările
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // CREATE: Adăugare o postare nouă
  // Omit<Post, 'id'> înseamnă "toate proprietățile din Post, mai puțin id"
  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  // UPDATE: Actualizare o postare existentă
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post);
  }

  // DELETE: Ștergere o postare
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}