import { Component, inject } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { ProductsService } from '../../services/products.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <app-product-list
      title="Отдельный навык"
      subtitle="Изучите востребованные технологии, чтобы улететь в Амреику, получив там работу"
      [products]="products.byGroup['skill']"
      />
      <hr>
    <app-product-list
      title="Интенсивы"
      subtitle="Экспресс-программы, где получишь знания"
      [products]="products.byGroup['intensive']"
    />
    <hr>
    <app-product-list
      title="Бесплатные курсы"
      subtitle="Необходимые навыки для портфолио"
      [products]="products.byGroup['course']"
    />
    <hr>
  `,
})
export class ShopComponent {

  telegram = inject(TelegramService);
  products = inject(ProductsService)

  constructor() {
    this.telegram.BackButton.hide();
  }

}
