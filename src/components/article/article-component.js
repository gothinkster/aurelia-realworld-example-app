import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ArticleService} from "../../shared/services/article-service";
import {CommentService} from "../../shared/services/comment-service";
import {SharedState} from "../../shared/state/shared-state";

@inject(ArticleService, CommentService, SharedState, Router)
export class ArticleComponent {
  article;
  comments;
  myComment;

  constructor(articleService, commentService, sharedState, router) {
    this.articleService = articleService;
    this.commentService = commentService;
    this.sharedState = sharedState;
    this.router = router;
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

  onToggleFavorited(value) {
    if (value) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(value) {
    this.article.author.following = value;
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
