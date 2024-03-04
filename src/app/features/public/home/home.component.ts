import { Observable } from 'rxjs';
import { BlogPostService } from './../../blog-post/services/blog-post.service';
import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../blog-post/model/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blog$?: Observable<BlogPost[]>

  constructor(private BlogPostService: BlogPostService){

  }

  ngOnInit(): void {
    this.blog$ = this.BlogPostService.getAllBlogPosts();
  }
}
