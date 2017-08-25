import {inject} from 'aurelia-framework';
import {ArticleService} from "../../shared/services/articleservice";
import {CommentService} from "../../shared/services/commentservice";
import {UserService} from "../../shared/services/userservice";
import {SharedState} from "../../shared/state/sharedstate";
import {ProfileService} from "../../shared/services/profileservice";

@inject(ArticleService, CommentService, UserService, SharedState, ProfileService)
export class ArticleComponent {
  article;
  comments;
  myComment;
  
  constructor(as, cs, us, shst, ps) {
    this.articleService = as;
    this.commentService = cs;
    this.userService = us;
    this.sharedState = shst;
    this.profileService = ps;
  }
  
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.slug = params.slug;
    
    return this.articleService.get(this.slug)
      .then(article => {
        this.article = article;
        this.commentService.getList(this.slug)
          .then(comments => this.comments = comments);
      });
  }
  
  onToggleFavorited() {
    this.article.favorited = !this.article.favorited;
    if (this.article.favorited) {
      this.article.favoritesCount++;
      this.articleService.favorite(this.slug);
    } else {
      this.article.favoritesCount--;
      this.articleService.unfavorite(this.slug);
    }
  }
  
  onToggleFollowing() {
    this.article.author.following = !this.article.author.following;
    if (this.article.author.following)
      this.profileService.follow(this.article.author.username);
    else
      this.profileService.unfollow(this.article.author.username);
  }
  
  postComment() {
    return this.commentService.add(this.slug, this.myComment)
      .then(comment => {
        this.comments.push(comment);
        this.myComment = '';
      })
  }

}
