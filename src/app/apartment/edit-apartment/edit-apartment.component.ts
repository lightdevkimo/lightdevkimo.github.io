import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.scss']
})
export class EditApartmentComponent implements OnInit {
  imagesUrl !:FileList

  constructor() { }

  ngOnInit(): void {
  }
  addApartment(form:NgForm){
    console.log(form.value) ;
    console.log(form);
    
  }
  selectFiles(event): void {
    this.imagesUrl = event.target.files
    console.log(this.imagesUrl);
     
  }

}
