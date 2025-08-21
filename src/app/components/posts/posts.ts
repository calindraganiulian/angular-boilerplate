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
  // Proprietate pentru a lega datele din formularul de adăugare
  newPost: Omit<Post, 'id' | 'userId'> = { title: '', body: '' };
  // Proprietăți pentru a gestiona starea de editare
  editingPostId: number | null = null;
  editedPost: Post | null = null;

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

  onAddPost(): void {
    if (!this.newPost.title || !this.newPost.body) {
      alert('Titlul și conținutul sunt obligatorii!');
      return;
    }

    const postToCreate = {
      title: this.newPost.title,
      body: this.newPost.body,
      userId: 1 // ID-ul utilizatorului este hardcodat pentru simplitate
    };

    this.apiService.createPost(postToCreate).subscribe(createdPost => {
      this.posts.unshift(createdPost); // Adăugăm postarea nouă la începutul listei
      this.newPost = { title: '', body: '' }; // Resetăm formularul
    });
  }

  onEdit(post: Post): void {
    this.editingPostId = post.id;
    // Creăm o copie a postării pentru a nu modifica direct lista
    this.editedPost = { ...post };
  }

  onUpdatePost(): void {
    if (!this.editedPost) {
      return;
    }

    this.apiService.updatePost(this.editedPost).subscribe(updatedPost => {
      // Căutăm indexul postării în array-ul local
      const index = this.posts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        // Înlocuim postarea veche cu cea actualizată
        this.posts[index] = updatedPost;
      }
      this.onCancelEdit(); // Ieșim din modul de editare
    });
  }

  onCancelEdit(): void {
    this.editingPostId = null;
    this.editedPost = null;
  }
}
