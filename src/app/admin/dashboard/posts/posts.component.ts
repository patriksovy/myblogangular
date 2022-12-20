import { Component, OnInit, } from '@angular/core';
import { PostsService } from './postlist/posts.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  public postForm: FormGroup;
  postRef: any;

  constructor(
    private ps:PostsService,
    public formBuilder: FormBuilder,
    ) {
      this.postForm = this.formBuilder.group({
        title: [''],
        content: [''],
      })
     }
     ngOnInit(): void{
      
     }

     onSubmit(){
      this.ps.createPost(this.postForm.value);
     }


}
