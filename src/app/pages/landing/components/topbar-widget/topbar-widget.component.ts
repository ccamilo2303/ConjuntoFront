import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topbar-widget',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule],
  templateUrl: './topbar-widget.component.html',
  styleUrl: './topbar-widget.component.scss'
})

export class TopbarWidgetComponent {

  constructor(public router: Router) {}

}
