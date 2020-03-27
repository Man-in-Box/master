import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show-user-data',
  templateUrl: './show-user-data.component.html',
  styleUrls: ['./show-user-data.component.css'],
  providers: [HttpService]
})
export class ShowUserDataComponent implements OnInit {

  posts: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getPosts().subscribe(data => this.posts=data);
  }

}
