import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationDirective } from '../../shared/directive/animation.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AnimationDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sites = [
    {url:'img/site1.webp', zIndex:1, transform: 90, margin:'-right: -100px;'},
    {url:'img/site2.webp', zIndex:2, transform: 60, margin:'-right: -100px;'},
    {url:'img/site3.webp', zIndex:3, transform: 30, margin:'-right: -100px;'},
    {url:'img/site4.webp', zIndex:4, transform: 0, margin:': 0 -50px; filter: grayscale(0); transform: scale(1.3) translateY(-10%) !important; opacity: 1;'},
    {url:'img/site5.webp', zIndex:3, transform: 30, margin:'-left: -100px;'},
    {url:'img/site6.webp', zIndex:2, transform: 60, margin:'-left: -100px;'},
    {url:'img/site7.webp', zIndex:1, transform: 90, margin:'-left: -100px;'},
  ]
  
  siteUp(index:number){
    const antes = this.sites.slice(0, index);
    const depois = this.sites.slice(index+1);
    const atual = this.sites[index];
    const tranform = (directio:string, length:number, i:number, e:any)=>{
      e.transform= 30*(i+1);
      e.zIndex= length-i;
      e.margin=directio+': -100px;';
    }
    antes.slice().reverse().forEach((e,i)=>{ tranform('-right', antes.length, i, e)})
    depois.forEach((e,i)=>{tranform('-left', depois.length, i, e)})

    atual.transform= 0;
    atual.margin="margin: 0 -50px; filter: grayscale(0); transform: scale(1.3) translateY(-10%) !important; opacity: 1;";
    atual.zIndex = this.sites.length+this.sites.length;
    this.sites = [...antes,atual,...depois]
  }
}
