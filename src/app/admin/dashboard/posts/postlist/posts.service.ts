import { Injectable } from '@angular/core';
import {post} from './post.model';
import {Subject} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../models/post.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts:post[] =[];
  private postUpdate = new Subject<post[]>

  getUpdateListener(){
    return this.postUpdate.asObservable();
  }
  constructor(private angularFirestore: AngularFirestore) { }
  addPost(title:string, content:string, datetime:any,){
    const post:post={title:title, content:content, datetime: new Date()};
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);
  }
  getPostsList(){
    return this.angularFirestore
    .collection('posts')
    .snapshotChanges();
  }

  createPost(post: Post){
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
      .collection('posts')
      .add(post)
      .then(response =>{ console.log(response)}, error => reject(error));
    });
  }
  deletePost(post: Post){
    return this.angularFirestore
    .collection('posts')
    .doc(post.id)
    .delete();
  }
  updatePost(post: Post, id:string){
    return this.angularFirestore
    .collection('posts')
    .doc(post.id)
    .update({
      title: post.title,
      content: post.content,
      
    })
  }
}
