import { Component, OnInit} from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit{
  post:Post[];
  
  constructor(private ps: PostsService){
    
  }
  
  ngOnInit(): void {
      this.ps.getPostsList().subscribe(res =>
        this.post = res.map( e =>{
          return{
            id : e.payload.doc.id,
            ...e.payload.doc.data() as {}
          } as Post;
        })
        )};

  removePost(post){
    if(confirm("Are you sure you want to delete this post?")){
      this.ps.deletePost(post);
    }
  }
}