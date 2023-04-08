import { Injectable } from '@angular/core';
import { of, pipe, tap, map, Observable } from 'rxjs';
import { ArticleBriefModel } from './news-results/article-brief.model';
import { AppConfigService } from '../../appconfig.service';
import { HttpClient } from '@angular/common/http';
import { ArticleModel } from '../article/article.model';
import { v4 as uuid } from 'uuid';

@Injectable({
 providedIn: 'root'
})
export class NewsService {
 private articles: { [article_id: string]: ArticleModel } = {};
 private categories: Array<string> = [];

 constructor(private appconfig: AppConfigService, private http: HttpClient) { }

 public getNews(page: number, pageSize: number, searchText?: string, category?: string): Observable<Array<ArticleBriefModel>> {
    const baseUrl = this.appconfig.apiBaseUrl;
    let url = `${baseUrl}/articles?page=${page}&page_size=${pageSize}`;
    if (searchText) url += `&search_text=${searchText}`;
    if (category) url += `&category=${category}`;
    return this.http
        .get<{ articles: Array<ArticleModel> }>(url)
        .pipe(
            map((data: { articles: Array<ArticleModel> }) : Array<ArticleModel> => 
                data.articles.map((article, articleIndex) => ({
                    ...article,
                    article_id: uuid(),
                    article_index: (page - 1) * pageSize + articleIndex}))),
            tap((articles: Array<ArticleModel>) => articles.forEach(article =>
                this.articles[article.article_id] = article)),
            map((articles: Array<ArticleModel>) : Array<ArticleBriefModel> => 
                articles.map(({article_id, article_index, title, published_date, image_url, description}) => 
                    ({article_id, article_index, title, published_date, image_url, description})))
        );
  }

 public getArticle(article_id: string): ArticleModel {
   return this.articles[article_id];
 }

 public getArticleCategories(): Observable<Array<string>> {
    if (this.categories.length){
      return of(this.categories);
    }

    const baseUrl = this.appconfig.apiBaseUrl;
    const url = `${baseUrl}/categories`;
    return this.http
      .get<{ categories: Array<string> }>(url)
      .pipe(
        map((response: { categories: Array<string> }) => response.categories),
        tap((categories: Array<string>) => this.categories = categories)
      );
  }
}