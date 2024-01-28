import { group } from '@angular/animations';
import { Injectable } from '@angular/core';

const domain = 'https://result.school';

export enum ProductType {
  Skill = 'skill',
  Intensive = 'intensive',
  Course = 'course'
}

export interface IProduct {
  id: string;
  text: string;
  title: string;
  link: string;
  image: string;
  time: string;
  type: ProductType // Тип может быть трех типов: скилл, интенсив или курс
}

function addDomainToLinkAndImage(product: IProduct) {
  return {
    ...product,
    image: domain + product.image,
    link: domain + product.link
  };
}

const products: IProduct[] = [
  {
    id: '29',
    title: 'TypeScript',
    link: '/products/typescript',
    image: '/img/icons/products/icon-ts.svg',
    text: 'Основы, типы, компилятор, классы, generic, утилиты, декораторы, advanced...',
    time: 'С опытом 2 недели',
    type: ProductType.Skill
  },
  {
    id: '30',
    title: 'Git и GitHub',
    link: '/products/git',
    image: '/img/icons/products/icon-git.svg',
    text: 'BLD, история версий, ветвление, удаленный репозиторий, релизы, opensourse...',
    time: 'С опытом 2 недели',
    type: ProductType.Skill
  },
  {
    id: '910',
    title: 'Redux, Redux Toolkit и MobX',
    link: '/products/state-managers',
    image: '/img/icons/products/icon-state-managers.svg',
    text: 'Redux, React Redux, Redux DevTools, Redux Toolkit, RTK Query, MobX...',
    time: 'С опытом 2 недели',
    type: ProductType.Skill
  },
  {
    id: '940',
    title: 'React Advanced',
    link: '/products/react',
    image: '/img/icons/products/icon-react.svg',
    text: 'React JS, Хуки, Формы, React Route v6, Context API, Оптимизация, Архитектура, PWA...',
    time: 'С опытом 2 недели',
    type: ProductType.Skill
  },
  {
    id: '950',
    title: 'Продвинутый JS. Создаем свой Excel',
    link: '/products/advanced-js',
    image: '/img/icons/products/icon-advanced-js.svg',
    text: 'Webpack, Jest, Node.js, State Managers, ООП, ESlint, SASS, Data Layer',
    time: 'С опытом 2 недели',
    type: ProductType.Intensive
  },
  {
    id: '960',
    title: 'Воркшоп <<Перспективы в IT>>',
    link: '/products/perspectives',
    image: '/img/icons/products/icon-workshop.svg',
    text: '4 Шага к карьере в IT, грейды и зарплата frontend-разработчика, технологии для старта...',
    time: 'С опытом 2 недели',
    type: ProductType.Course
  }
]


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  readonly products: IProduct[] = products.map(addDomainToLinkAndImage);//Сюда вернется новый массив

  constructor() { }

  getById(id: string) {
    return this.products.find((p) => p.id == id)//Получаем нужный товар по id
  }

  get byGroup() {
    return this.products.reduce((group, prod) => {
      if (!group[prod.type]) {
        group[prod.type] = []
      }
      group[prod.type].push(prod)
      return group
    }, {})
  }

  
}
