import { Injectable } from '@angular/core';
import {post} from './post.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts:post[] =[];
  private postUpdate = new Subject<post[]>

  getUpdateListener(){
    return this.postUpdate.asObservable();
  }
  constructor() { }
  addPost(title:string, content:string, datetime:any,){
    const post:post={title:title, content:content, datetime: new Date()};
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);
  }
  getAll(){
    return [...this.posts];
  }
}
