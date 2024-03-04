import { ImageService } from './../../../shared/components/image-selector/image.service';
import { Category } from './../../category/models/category.model';
import { CategoryService } from './../../category/services/category.service';
import { BlogPostService } from './../services/blog-post.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../model/add-blog-post.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit,OnDestroy {
  model: AddBlogPost;
  categories$? : Observable<Category[]>;
  isImageSelectorVisible:boolean =false;
  // imageSelectorSubscription: Subscription;
  imageSelectotSubscription?: Subscription

  private AddBlogPostSubscribtion?: Subscription;

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService) {
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
    this.imageSelectotSubscription = this.imageService.onSelectImage()
    .subscribe({
      next:(selectedImage)=>{
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
    })
  }

  onFormSubmit() : void{
    console.log(this.model);
    this.AddBlogPostSubscribtion = this.blogPostService.createBlogPost(this.model).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectotSubscription?.unsubscribe();
  }
}
