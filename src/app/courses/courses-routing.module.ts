import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { CourseResolver } from "./services/course.resolver";

const routes: Routes = [
  // la prima rotta che aggiungiamo qui è quella della root, quindi quella che corrisponderebbe a localhost:4200/courses, lasceremo il path vuoto
  {
    path: "",
    component: HomeComponent,
  },
  // rotta per visualizzare il componente Course, al quale passiamo alcuni valori
  // il path lo rendiamo dinamico
  // la logica la implementiamo in courses-card-list, dove c'è l'*ngFor ed il button VIEW COURSE
  // se ci sono problemi di fetching dei dati dal backend potremmo avere che la pagina richiesta non venga renderizzata o si potrebbe avere qualche problema
  // infatti questo componente renderizza i dati del corso cliccato, quindi se questi non arrivano dal BE non posso mostrare nulla
  // il Router Resolver Services mi permette di controllare che i dati che mi serviranno per il componente siano effettivamente disponibili
  // creo un file chiamato course.resolver.ts in src/courses/services
  {
    path: ":courseUrl",
    component: CourseComponent,
    // utilizzo il CourseResolver in questa rotta perchè voglio essere sicuro di avere i dati da mostare
    // il corso sarà disponibile in una proprietà che chiamo course, potrei aggiungerne di più e per ognuna indicare un Resolver diverso che posso creare
    // quindi il corso sarà disponibile già alivello di Router
    resolve: {
      course: CourseResolver,
    },
  },
];

@NgModule({
  // importiamo il RouterModule ed utilizziamo il metodo forChild(), diciamo quindi che queste rotte sono le child di quella indicata in app-routing.module.ts con path "courses" ed in cui abbiamo importato in lazy loading il modulo CoursesModule
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // importo fra i providers il CourseResolver creato
  providers: [CourseResolver],
})
export class CoursesRoutingModule {}
