import { CategoryService } from './../../category/services/category.service';
import { BlogPostService } from './../services/blog-post.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../model/blog-post.model';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../model/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy{

  id:string|null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[]

  routeSubscription? : Subscription
  updateBlogPostSubscription? : Subscription
  getBlogPostSubscription? : Subscription
  deleteBlogPostSubscription? : Subscription

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router:Router){

  }

  ngOnInit(): void {

    this.categories$ =  this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next:(parmas) =>{
        this.id = parmas.get( "id" );
        if(this.id){
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) =>{
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          })
        }
      }
    })
  }

  onFormSubmit(): void{
      if(this.model && this.id){
        var updateBlogPost: UpdateBlogPost = {
          author: this.model.author,
          content: this.model.content,
          shortDescription:this.model.shortDescription,
          featuredImageUrl: this.model.featuredImageUrl,
          isVisible:this.model.isVisible,
          publishedDate:this.model.publishedDate,
          title: this.model.title,
          urlHandle:this.model.urlHandle,
          categories: this.selectedCategories ?? []
        };
        this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id , updateBlogPost).subscribe({
          next:(response)=>{
            this.router.navigateByUrl('/admin/blogposts');
          }
        })
      }
  }

  OnDelete():void{
    if(this.id){
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }

}
