import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fileUrl;
  //В Ангуляре есть встроеная библиотека для работы с файлами DomSanitizer
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    //Данные в файле. По сути сюда пихать то, что придет с бэка
    const data = `
    using System;
    public class Person
    {
      public Person()
      {
          Name = "unknown";
      }
      public Person(string name)
      {
          Name = name;
      }
      public string Name { get; }
      public override string ToString()
      {
          return Name;
      }
    }
    `;
    //Создается файл с данными, пришедшими с бэка
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

}
