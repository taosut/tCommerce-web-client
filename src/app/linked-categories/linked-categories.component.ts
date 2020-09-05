import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { LinkedCategoryDto } from '../shared/dtos/linked-category.dto';
import { API_HOST } from '../shared/constants';
import { DeviceService } from '../services/device-detector/device.service';

@Component({
  selector: 'linked-categories',
  templateUrl: './linked-categories.component.html',
  styleUrls: ['./linked-categories.component.scss']
})
export class LinkedCategoriesComponent implements OnChanges, OnInit {

  needToDemonstrate: boolean;

  uploadedHost = API_HOST;

  @Input() categories: LinkedCategoryDto[];
  @Input() isLoading: boolean;
  @ViewChildren('itemRef') itemRefList: QueryList<ElementRef>;

  constructor(private deviceService: DeviceService,
              private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories']?.currentValue.length) {
      this.scrollToSelectedCategory();
    }
  }

  ngOnInit() {
    this.setNeedToDemonstrate();
  }

  scrollToSelectedCategory() {
    this.cdr.detectChanges();

    const selectedCategoryIndex = this.categories.findIndex(category => category.isSelected);
    const selectedCategoryEl = this.itemRefList.find((categoryRef, index) => index === selectedCategoryIndex);

    selectedCategoryEl.nativeElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  getCategoryImage(category) {
    if (!category.medias[0]?.variantsUrls.small) {
      return '/assets/images/no-img.png';
    } else {
      return this.uploadedHost + category.medias[0]?.variantsUrls.small;
    }
  }

  setNeedToDemonstrate() {
    if (this.deviceService.isPlatformServer()) { return; }

    let clearDate = JSON.parse(localStorage.getItem('scrollDemonstrationClearDate'));
    let currentDate = Date.now();

    if (currentDate >= clearDate) {
      this.needToDemonstrate = true;
      localStorage.setItem('scrollDemonstrationClearDate', JSON.stringify(Date.now() + (1000 * 60 * 60 * 24 * 3)));
    }
  }

}
