

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Usuario: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.Usuario = history.state.username;
  }
  
}

