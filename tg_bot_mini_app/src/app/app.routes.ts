import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {path: '', component: ShopComponent, pathMatch:"full"},  //Для главной страницы payhMatch, чтобы при других страницах не открывался/Только 
                                                             //  при отсутствующих роутах открывается именно эта страничка, а не фидбек и главная
    {path: 'feedback', component: FeedbackComponent},
    {path: 'product/:id', component: ProductComponent},
];
