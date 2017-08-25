import {inject} from 'aurelia-framework';
import {ArticleService} from "../../shared/services/articleservice";
import {CommentService} from "../../shared/services/commentservice";
import {UserService} from "../../shared/services/userservice";
import {SharedState} from "../../shared/state/sharedstate";

@inject(ArticleService, CommentService, UserService, SharedState)
export class ArticleComponent {
  article;
  comments;
  
  constructor(as, cs, us, shst) {
    this.articleService = as;
    this.commentService = cs;
    this.userService = us;
    this.sharedState = shst;
  }
  
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
  
    return this.articleService.get(params.slug)
      .then(article => {
        this.article = article;
        this.commentService.getList(params.slug)
          .then(comments => this.comments = comments);
      });
  }
  
  

}
