import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { EnvironmentService } from './core/service/environment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly environmentS:EnvironmentService,
    private readonly el:ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private readonly document:Document,
  ){}
  environment = new Subject<typeof environment>();
  lastScroll = {...environment}.scroll

  ngOnInit(): void { this.onWindowScroll() }
  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    environment.scroll = this.document.documentElement.scrollTop;
    environment.tela = this.document.defaultView?.innerHeight ?? 1;
    environment.direction = environment.scroll > this.lastScroll;
    this.lastScroll = environment.scroll;
    this.environmentS.setEnviroment();
  }
}
