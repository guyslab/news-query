import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleBriefModel } from './news-results/article-brief.model';
import { NewsQueryFormModel } from './news-query/news-query-form.model';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input() query: NewsQueryFormModel;
  @Output() queryChange = new EventEmitter<NewsQueryFormModel>();

  @Output() articleSelect = new EventEmitter<{articleId: string}>();
  @Output() newsScrollDownThresholdReach = new EventEmitter<void>();
  @Input() articleBriefs: Array<ArticleBriefModel> = [];

  constructor() {
    this.query = {
      category: "",
      searchText: ""
    };
  }

  onArticleSelected(event: {articleId: string}) {
    this.articleSelect.emit(event);
  }

  onScrollDownThresholdReached(): void {
    this.newsScrollDownThresholdReach.emit();
  }

  onQueryChanged(query: NewsQueryFormModel) {
    this.query = query;
    this.queryChange.emit(query);
  }
}
