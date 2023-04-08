import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ArticleModel } from './article/article.model';
import { NewsService } from './news/news.service';
import { ArticleBriefModel } from './news/news-results/article-brief.model';
import { NewsQueryFormModel } from './news/news-query/news-query-form.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  articleBriefs: Array<ArticleBriefModel>;
  selectedArticle?: ArticleModel;
  loading: boolean = false;
  lastPage: number;
  pageSize: number;
  activeQuery: NewsQueryFormModel;
  backBtnPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  private newsSubscriptions?: Subscription;

  constructor(private newsService: NewsService) {    
    this.lastPage = 0;
    this.pageSize = 25;
    this.articleBriefs = [];
    this.activeQuery = {
      category: "",
      searchText: ""
    };
    this.backBtnPosition = 'top-left';
  }

  onQueryChange(query: NewsQueryFormModel): void {
    this.activeQuery = query;
    this.onNewNewsQuery(query)
  }

  ngOnDestroy(): void {
    this.newsSubscriptions?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loadNextPage();
  }

  onNewNewsQuery(query: NewsQueryFormModel): void {
    this.lastPage = 0;
    this.articleBriefs.length = 0;
    this.activeQuery = query;
    this.loadNextPage();
  }

  loadNextPage(): void {
    this.loading = true;
    this.newsSubscriptions = this.newsService.getNews(++this.lastPage, this.pageSize, this.activeQuery.searchText, this.activeQuery.category)
      .subscribe({
          next: (data: Array<ArticleBriefModel>) => {
            this.articleBriefs = [...this.articleBriefs, ...data];
            this.loading = false;
          }, 
          error: (e) => {
            this.loading = false;
            alert("Error getting news");
          }
      });
  }

  onNewsScrollDownThresholdReached(): void {
    this.loadNextPage();
  }

  onArticleSelected(articleId: string): void {
    this.selectedArticle = this.newsService.getArticle(articleId);
  }  

  onBackToNewsClick(): void {
    this.selectedArticle = undefined;
  }

  getArticleMargin() {
    return this.backBtnPosition.includes('top')
      ? '128px 0 0 0'
      : '0 0 128px 0';


  }
}
