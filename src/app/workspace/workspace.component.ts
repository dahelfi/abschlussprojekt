import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  public Editor = ClassicEditor;

  public config = {
    placeholder: 'Type the content here!'
  }

  fillerContent = Array.from(
    { length: 8 },
    () =>
      `Lorem`,
  );

  constructor() { }

  ngOnInit(): void {
  }

}
