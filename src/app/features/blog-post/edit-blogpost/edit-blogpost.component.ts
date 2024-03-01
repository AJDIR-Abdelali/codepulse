import { CategoryService } from './../../category/services/category.service';
import { BlogPostService } from './../services/blog-post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../model/blog-post.model';
import { Category } from '../../category/models/category.model';

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
  constructor(private route: ActivatedRoute,private blogPostService: BlogPostService,private categoryService: CategoryService){

  }

  ngOnInit(): void {

    this.categories$ =  this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next:(parmas) =>{
        this.id = parmas.get( "id" );
        if(this.id){
          this.blogPostService.getBlogPostById(this.id).subscribe({
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

  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

}
