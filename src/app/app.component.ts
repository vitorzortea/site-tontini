import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly el:ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private readonly document:Document,
  ){}

  ngOnInit(): void { this.onWindowScroll() }
  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    environment.scroll = this.document.documentElement.scrollTop;
    this.el.nativeElement.setAttribute('scroll', environment.scroll?.toString());
  }
}
