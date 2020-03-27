import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    getPosts(){
        return this.http.get('http://localhost:3000/posts')
    }

    createPost(post: UserModel){    
        const body = {title: post.title, text: post.text};
        return this.http.post('http://localhost:3000/posts', body); 
    }

}