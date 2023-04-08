import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NewsQueryFormModel } from './news-query-form.model';
import { NewsService } from '../news.service';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'news-query',
  templateUrl: './news-query.component.html',
  styleUrls: ['./news-query.component.scss']
})
export class NewsQueryComponent implements OnInit, OnDestroy {
  @Output() queryChange = new EventEmitter<NewsQueryFormModel>();
  @Input() query: NewsQueryFormModel;
  categories: Array<string>;  
  private readonly searchSubject = new Subject<string | undefined>();
  private searchSubscription?: Subscription;
  private categoriesSubscription?: Subscription;

  constructor(private newsService: NewsService) {
    this.categories = [];
    this.query = {
      category: "",
      searchText: ""
    };
  }
  ngOnInit(): void {
    this.categoriesSubscription = this.newsService.getArticleCategories()
      .subscribe(categories => this.categories = categories);

      this.searchSubscription = this.searchSubject
        .pipe(
          debounceTime(1300),
          distinctUntilChanged(),
        )
        .subscribe(searchText => this.onSearchText(searchText as string));
  }

  onCategoryClick(category: string) {
    this.query = {
      ...this.query,
      category
    }
    this.queryChange.emit(this.query);
  }

  onSearchInput(event: Event): void{
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  onSearchText(searchText: string) {
    this.query = {
      ...this.query,
      searchText
    }
    this.queryChange.emit(this.query);
  }

  public ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
  }
}
