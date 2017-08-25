import {BindingEngine} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {SharedState} from '../../shared/state/sharedstate';
import {ArticleService} from "../../shared/services/articleservice"
import {TagService} from '../../shared/services/tagservice';

@inject(SharedState, BindingEngine, ArticleService, TagService)
export class HomeComponent {
  articles = [];
  shownList = 'all';
  tags = [];
  filterTag = undefined;
  
  constructor(sharedState, bindingEngine, articleService, tagService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.articleService = articleService;
    this.tagService = tagService;
  }
  
  bind() {
    this.subscription = this.bindingEngine.propertyObserver(this.sharedState, 'isAuthenticated')
      .subscribe((newValue, oldValue) => {
        console.log('homeComponent isAuthenticated: ', newValue)
      })
  }
  
  unbind() {
    this.subscription.dispose();
  }
  
  attached() {
    this.getArticles();
    this.getTags();
  }
  
  getArticles() {
    this.articleService.getList({type: this.shownList})
      .then(response => {
        this.articles.splice(0);
        this.articles.push(...response.articles)
      })
  }
  
  getTags() {
    this.tagService.getList()
      .then(response => {
        this.tags.splice(0);
        this.tags.push(...response);
      })
  }
  
  setListTo(type, tag) {
    this.shownList = type;
    this.filterTag = tag;
    this.getArticles();
  }
  
  getFeedLinkClass() {
    let clazz = '';
    if (!this.sharedState.isAuthenticated)
      clazz += ' disabled';
    if (this.shownList === 'feed')
      clazz += ' active';
    return clazz;
  }
}
