import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BinaryClassificationComponent } from './componets/binary-classification/binary-classification.component';
import { CustomHttpClientService } from './services/custom-http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';    




@NgModule({
  declarations: [
    AppComponent,
    BinaryClassificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule,
    ButtonModule,
    AccordionModule,
  ],
  providers: [CustomHttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
