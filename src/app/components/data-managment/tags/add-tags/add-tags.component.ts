import { Router } from '@angular/router';
import { TagsService } from '../../../../services/tags.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.css']
})
export class AddTagsComponent implements OnInit {

  public formTags: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagsService,
    private route: Router
  ) {
    this.formTags = this.formBuilder.group({
      content: new FormControl('', Validators.required)
    })
   }

   get content(){
     return this.formTags.get('content');
   }

  ngOnInit() {
  }

  addTag(){
    const content = this.formTags.controls['content'].value
    const date = new Date().toLocaleDateString();
    
    this.tagService.addTag(content, date);

    this.route.navigate(["list-tags"]);
  }

}
