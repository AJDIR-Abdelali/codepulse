import { Category } from './../../category/models/category.model';
import { CategoryService } from './../../category/services/category.service';
import { BlogPostService } from './../services/blog-post.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{
  model: AddBlogPost;
  categories$? : Observable<Category[]>;

  private AddBlogPostSubscribtion?: Subscription;

  constructor(private blogPostService: BlogPostService,private router: Router,private categoryService: CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit() : void{
    console.log(this.model);
    this.AddBlogPostSubscribtion = this.blogPostService.createBlogPost(this.model).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }
}
