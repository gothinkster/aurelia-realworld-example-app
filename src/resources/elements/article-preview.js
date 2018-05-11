import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SharedState} from '../../shared/state/shared-state';
import {ArticleService} from '../../shared/services/article-service';

@inject(Router, SharedState, ArticleService)
export class ArticlePreview {
  @bindable article;
  
  constructor(router, state, articleService) {
    this.router = router;
    this.state = state;
    this.articleService = articleService;
  }

  onToggleFavorited() {
    if (!this.state.isAuthenticated) {
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
}
