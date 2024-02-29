import { BlogPostService } from './../services/blog-post.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;

  private AddBlogPostSubscribtion?: Subscription;

  constructor(private blogPostService: BlogPostService,private router: Router) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
    }
  }

  onFormSubmit() : void{
    this.AddBlogPostSubscribtion = this.blogPostService.createBlogPost(this.model).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }
}
