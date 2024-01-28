import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, ProductsService } from '../../services/products.service';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  template: `
    <div class="centered" >
      <h2 class="mb" >{{ product.title }}</h2>
      <br/>
      <img [src]="product.image" [alt]="product.title">
      <p>{{ product.text }}</p>
      <p>{{ product.time }}</p>
      <a [href]="product.link" target="_blank" >Посмотреть курс</a>
    </div>
  `,
})
export class ProductComponent implements OnInit, OnDestroy {  //Интерфейсы он инит он дестрой для кнопки назад на продукте. 
  //По сути это жизненные циклы нашего компонента, где мы можем уже оперировать его этапами?

  product: IProduct;

  constructor(
    private products: ProductsService, 
    private telegram: TelegramService,
    private route: ActivatedRoute,  // ОТВЕЧАЕТ ЗА ТЕКУЩИЙ АКТИВНЫЙ РОУТ. Получим конкретно то что находится в адресной строке (id)
    private router: Router  //Просто навигация
    ) {
      const id = this.route.snapshot.paramMap.get('id');//ПОЛУЧАЕМ АЙДИ. 
      this.product = this.products.getById(id);
      this.backRoute = this.backRoute.bind(this); // Необходимо прописать чтобы у нас была одна и та же функция, не было утечек памяти!!!!!!!!!
      //Также в функции backRoute мы обращаемся к this, но в JS когда мы передаем this как референс, то он теряется, то для этого мы забайндим его изначально
    }

  backRoute() {
    this.router.navigate(['/'])
  }
  

  ngOnInit(): void {
    this.telegram.BackButton.show() //Показали кнопку!!!!!!!!!!!!!!!!!!!!!!, но ещё надо обработать клик!!!!!!!!!!!!!!!!!!!!!!
    this.telegram.BackButton.onClick(this.backRoute)
  }

  ngOnDestroy(): void { // В дестрое мы удаляем слушатель, те делаем метод офф клик!!!!!!!
      this.telegram.BackButton.offClick(this.backRoute)
  }



}
