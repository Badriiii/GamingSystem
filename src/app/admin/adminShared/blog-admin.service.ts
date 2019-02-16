import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from '../adminShared/blog';

@Injectable()
export class BlogAdminService{ 

    createPost(post: Blog){
        
        let storageRef = firebase.storage().ref();
        storageRef.child(`images/@{post.ImgTitle}`).putString(post.img, 'base64')
        .then((snapshot: any)=>{
            let url = snapshot.metadata.downloadUrl[0];
            let dbRef = firebase.database().ref('blogPosts/');
            let newPost = dbRef.push(); 
            newPost.set({
                title: post.title,
                content: post.content,
                imgTitle: post.imgTitle,
                img: url,
                id: newPost.key
            });
        })
        .catch((error: any) =>
        {
            alert(`failed upload: ${error}`);
        });
        


    } 
}