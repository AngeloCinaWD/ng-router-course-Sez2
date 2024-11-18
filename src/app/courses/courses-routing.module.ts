import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";

const routes: Routes = [
  // la prima rotta che aggiungiamo qui è quella della root, quindi quella che corrisponderebbe a localhost:4200/courses, lasceremo il path vuoto
  {
    path: "",
    component: HomeComponent,
  },
  // rotta per visualizzare il componente Course, al quale passiamo alcuni valori
  // il path lo rendiamo dinamico
  // la logica la implementiamo in courses-card-list, dove c'è l'*ngFor ed il button VIEW COURSE
  {
    path: ":courseUrl",
    component: CourseComponent,
  },
];

@NgModule({
  // importiamo il RouterModule ed utilizziamo il metodo forChild(), diciamo quindi che queste rotte sono le child di quella indicata in app-routing.module.ts con path "courses" ed in cui abbiamo importato in lazy loading il modulo CoursesModule
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CoursesRoutingModule {}
