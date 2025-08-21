import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Posts } from './components/posts/posts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Posts],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-crud-demo');
}
