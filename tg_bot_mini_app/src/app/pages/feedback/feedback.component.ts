import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  styles: `
    .form {
      height: 70vh;
      justify-content: center;
    }
  `,
  template: `
    <form class="ctntered form" >
      <h2 class="mb" >Обратная связь</h2>
      <textarea 
      [value]="feedback()"
      (input)="handleChange($event)"
      class="form-control" 
      >
      </textarea>
    </form>
  `,
  //<h1 >{{feedback()}}</h1> Передает символы из поля куда пишут текст,  другое поля
})
export class FeedbackComponent implements OnInit, OnDestroy {

  constructor(private telegram: TelegramService) {
    this.sendData = this.sendData.bind(this)
  }
  

  feedback = signal('')// Сигналы позволяют работать с реактивной динамикой. в 15 были добавлены/Через инпут будем видеть результат, а через value слушать



  handleChange(event) {//Просто ивент, хуй пойми почему. ЗАПОМНИ !
    this.feedback.set(event.target.value) //Изменяем сигналы с помощью set
    if (this.feedback().trim()) {
      this.telegram.MainButton.show()
    } else {
      this.telegram.MainButton.hide()
    }
  }

  sendData() {
    this.telegram.sendData({feedback: this.feedback()})
  }


  ngOnInit(): void {
    this.telegram.MainButton.setText('Отправить сообщение')
    // this.telegram.MainButton.show()
    // this.telegram.MainButton.disable()
    this.telegram.MainButton.hide()
    this.telegram.MainButton.onClick(this.sendData)
  
  }

  ngOnDestroy(): void {
    this.telegram.MainButton.offClick(this.sendData)  //Так как есть 2 метода сендДата, то надо забайндить в конструкторе, как я делал (this)
  }// Отписались от слушателя

}
