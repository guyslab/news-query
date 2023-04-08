import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Constants } from '../../../app.constants';
import { ArticleBriefModel } from './article-brief.model';

@Component({
  selector: 'news-results',
  templateUrl: './news-results.component.html',
  styleUrls: ['./news-results.component.scss']
})
export class NewsResultsComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['articleBriefs']?.currentValue) {
      this.scrollThresholdReached = false;
    }
  }

  @Output() articleSelect = new EventEmitter<{articleId: string}>();
  @Output() scrollDownThresholdReach = new EventEmitter<void>();
  @Input() articleBriefs: Array<ArticleBriefModel> = [];
  private scrollThresholdReached: boolean = false;

  onArticleClick(articleId: string) {
    this.articleSelect.emit({ articleId });
  }

  onScroll(event: Event): void {
    if (this.scrollThresholdReached) {
      return;
    }

    if (!event.target){
      return;
    }

    const scrollable = event.target as HTMLDivElement;
    // visible height + pixel scrolled >= total height 
    if (scrollable.offsetHeight + scrollable.scrollTop >= scrollable.scrollHeight * Constants.NEWS_SCROLL_DOWN_THRESHOLD) {
      this.scrollThresholdReached = true;
      this.onScrollDownThresholdReached();
    }
  }

  onScrollDownThresholdReached(): void {
    this.scrollDownThresholdReach.emit();
  }

  getBgColor(article: ArticleBriefModel) {
    return Constants.COLORS[article.article_index % Constants.COLORS.length];
  }

  identifyArticle(index: number, item: ArticleBriefModel){
    return item.article_id; 
  }
}
