import { Component, Input } from '@angular/core';
import { ArticleModel } from './article.model';
import { Constants } from "../../app.constants";

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() article?: ArticleModel;

  getBgColor() {
    return Constants.COLORS[this.article?.article_index || 0 % Constants.COLORS.length];
  }
}
