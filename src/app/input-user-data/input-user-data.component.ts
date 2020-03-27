import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-input-data-form',
  templateUrl: './input-user-data.component.html',
  styleUrls: ['./input-user-data.component.css'],
  providers: [HttpService]
})
export class InputUserDataComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  post: UserModel = new UserModel;

  submit(post: UserModel) {
    this.httpService.createPost(post)
      .subscribe(
        (data) => {console.log(data)},
        error => console.log(error)
        );
  }

  ngOnInit() {
     
  }
}
