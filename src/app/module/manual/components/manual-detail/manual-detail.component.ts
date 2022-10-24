import { ManualHttpService } from './../../manual-http.service';
import { DynamicParams } from './../../../layout/components/tab/Tab.model';
import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-manual-detail',
  templateUrl: './manual-detail.component.html',
  styleUrls: ['./manual-detail.component.less']
})
export class ManualDetailComponent implements OnInit, AfterViewInit {

  @Input()
  dynamicParams!:DynamicParams
  galleryThumbs?: Swiper
  galleryTop?: Swiper
  constructor(private manualHttpService:ManualHttpService) { }
  img: any = ['https://loremflickr.com/g/600/400/paris','https://loremflickr.com/600/400/paris,girl/all','https://loremflickr.com/600/400/brazil,rio','https://loremflickr.com/600/400/brazil,rio']
  ngOnInit(): void {
    this.manualHttpService.getInfo(this.dynamicParams.id!).then(res => {
      console.log(res);
    })

  }
  ngAfterViewInit() {
    this.galleryThumbs = new Swiper('.gallery-thumbs', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      spaceBetween: 10,
      slidesPerView: 2,
      watchSlidesVisibility: true,
    })
    this.galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      zoom: {
        maxRatio: 5,
      },
      thumbs: {
        swiper: this.galleryThumbs
      }
    })
  }
}
