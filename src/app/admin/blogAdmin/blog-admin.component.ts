import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../adminShared/user.service';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import * as firebase from 'firebase';
import { Blog } from '../adminShared/blog';

@Component({
    templateUrl: './blog-admin.component.html',
    styleUrls: ['./blog-admin.component.css']
   })

export class BlogAdminComponent implements OnInit{

    theUser: string;
    menuChoices: string;
    blogPosts: Blog[];

    constructor(
         private userSVC: UserService,
         private blogAdminSVC: BlogAdminService, 
         private router: Router)
         { }

         ngOnInit(){
            this.theUser = this.userSVC.loggedInUser;
            this.getPosts();
          }
        
          logout(){
            this.userSVC.logout();
            this.router.navigate(['']);
          }

          chooseMode(mode: string){
              this.menuChoices = mode;
          }

          getPosts(){
              let dbRef = firebase.database().ref('blogPosts/');
              dbRef.once('value')
              .then((snapshot) => {
                  let tmp: string[] = snapshot.val();
                  this.blogPosts = Object.keys(tmp).map(key => tmp[key])
              });
          }
}