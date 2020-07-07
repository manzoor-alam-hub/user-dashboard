import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

   public messageForm: NgForm
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    this.messageForm = form.value
    console.log(this.messageForm);
    form.reset();
  }

}
