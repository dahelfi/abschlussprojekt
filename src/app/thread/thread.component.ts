import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  public Editor = ClassicEditor;

  @ViewChild('editor') editorComponent!: CKEditorComponent;
 

  public getEditor() {
    // Warning: This may return "undefined" if the editor is hidden behind the `*ngIf` directive or
    // if the editor is not fully initialised yet.
    return this.editorComponent.editorInstance;
  }

  @Input() static threadOpen?: boolean;
  
  constructor(public backend:BackendServiceService) { }

  ngOnInit(): void {
  }

}
