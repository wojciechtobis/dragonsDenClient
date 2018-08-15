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
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { RegressionComponent } from './componets/regression/regression.component';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './componets/main-screen/main-screen.component';

const appRoutes: Routes = [
  { path: '', component: MainScreenComponent},
  { path: 'binary-classification', component: BinaryClassificationComponent },
  { path: 'regression',      component: RegressionComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BinaryClassificationComponent,
    RegressionComponent,
    MainScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule,
    ButtonModule,
    AccordionModule,
    SliderModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomHttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
