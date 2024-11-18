import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  // la prima rotta che aggiungiamo qui è quella della root, quindi quella che corrisponderebbe a localhost:4200/courses, lasceremo il path vuoto
  {
    path: "",
    component: HomeComponent,
  },
];

@NgModule({
  // importiamo il RouterModule ed utilizziamo il metodo forChild(), diciamo quindi che queste rotte sono le child di quella indicata in app-routing.module.ts con path "courses" ed in cui abbiamo importato in lazy loading il modulo CoursesModule
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CoursesRoutingModule {}
