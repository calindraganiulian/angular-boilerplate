import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Post } from '../../services/api.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts implements OnInit {
  posts: Post[] = [];

  // Injectăm ApiService prin constructor (Dependency Injection)
  constructor(private apiService: ApiService) {}

  // Această metodă este un "lifecycle hook" și se execută o singură dată,
  // la inițializarea componentei.
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    // Apelăm metoda din serviciu și ne "abonăm" la rezultat.
    this.apiService.getPosts().subscribe(data => {
      // Când datele sosesc, le salvăm în proprietatea 'posts' a componentei.
      this.posts = data.slice(0, 10); // Luăm doar primele 10 pentru a nu aglomera interfața
    });
  }

  deletePost(id: number): void {
    // Adăugăm o confirmare pentru a preveni ștergerile accidentale
    if (confirm('Ești sigur că vrei să ștergi această postare?')) {
      this.apiService.deletePost(id).subscribe(() => {
        // După ce API-ul confirmă ștergerea, actualizăm lista locală
        this.posts = this.posts.filter(post => post.id !== id);
      });
    }
  }
}
