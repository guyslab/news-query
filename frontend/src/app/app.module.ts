import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { NewsComponent } from './home/news/news.component';
import { ArticleComponent } from './home/article/article.component';
import { AppConfigService } from './appconfig.service';
import { TruncatePipe } from './home/news/truncate.pipe';
import { BackButtonComponent } from './home/back-button/back-button.component';
import { NewsQueryComponent } from './home/news/news-query/news-query.component';
import { NewsResultsComponent } from './home/news/news-results/news-results.component';
import { HomeComponent } from './home/home.component';
import { IsoToLocaleDatePipe } from './home/news/news-results/iso-to-locale-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    ArticleComponent,
    BackButtonComponent,
    NewsQueryComponent,
    NewsResultsComponent,
    TruncatePipe,
    IsoToLocaleDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { 
      provide : APP_INITIALIZER, 
      multi : true, 
       deps : [AppConfigService], 
       useFactory : (appConfigService : AppConfigService) =>  () => appConfigService.loadAppConfig()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
