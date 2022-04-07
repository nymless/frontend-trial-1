import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { SummaryCardComponent } from './components/summary-page/summary-card/summary-card.component';
import { HeadingCardComponent } from './components/summary-page/heading-card/heading-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    SummaryPageComponent,
    SummaryCardComponent,
    HeadingCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
