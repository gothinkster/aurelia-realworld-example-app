import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ArticleService} from "../../shared/services/article-service";
import {CommentService} from "../../shared/services/comment-service";
import {UserService} from "../../shared/services/user-service";
import {SharedState} from "../../shared/state/shared-state";
import {ProfileService} from "../../shared/services/profile-service";

@inject(ArticleService, CommentService, UserService, SharedState, ProfileService, Router)
export class ArticleComponent {
  article;
  comments;
  myComment;

  constructor(as, cs, us, shst, ps, r) {
    this.articleService = as;
    this.commentService = cs;
    this.userService = us;
    this.sharedState = shst;
    this.profileService = ps;
    this.router = r;
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
    if (!this.sharedState.isAuthenticated) {
      this.router.navigateToRoute('login');
      return;
    }
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
    if (!this.sharedState.isAuthenticated) {
      this.router.navigateToRoute('login');
      return;
    }
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

  @computedFrom('article.author.username')
  get canModify() {
    return this.article.author.username === this.sharedState.currentUser.username;
  }

  deleteArticle() {
    this.articleService.destroy(this.article.slug)
      .then(() => this.router.navigateToRoute('home'));
  }

  deleteComment(commentId) {
    this.commentService.destroy(commentId, this.slug)
      .then(() => {
        this.commentService.getList(this.slug)
          .then(comments => this.comments = comments);
      })
  }

}
