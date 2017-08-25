import {inject, observable} from 'aurelia-framework';
import {ArticleService} from "../../shared/services/articleservice";

@inject(ArticleService)
export class EditorComponent {
  article = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };
  @observable() tag;
  
  constructor(as) {
    this.articleService = as;
  }
  
  tagChanged(newValue, oldValue) {
    if (newValue !== undefined && newValue !== '')
      this.addTag(this.tag);
  }
  
  addTag(tag) {
    this.article.tagList.push(tag);
  }
  
  removeTag(tag) {
    this.article.tagList.splice(this.article.tagList.indexOf(tag), 1);
  }
  
  publishArticle() {
    this.articleService.save(this.article)
  }
}
