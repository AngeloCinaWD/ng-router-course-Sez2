import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { CoursesModule } from "./courses/courses.module";

// questa app contiene un modulo separato relativo ai courses, questo contiene services, componenti, un suo router etc
// questo modulo vogliamo che sia caricato in lazy loading, cioè che venga caricato solo quando se ne ha realemnte bisogno, solo quando accediamo in qualche parte di app che ne ha bisogno
// la prima cosa da fre per attivare in maniera pigra un modulo tramite router è definire l'activation path del router. Nel caso del modulo courses questo deve essere attivato solo quando si ha una rotta che inizia con /courses
const routes: Routes = [
  {
    // definisco il path per l'attivazione del modulo courses
    path: "courses",
    // gli import che utilizzo all'inizio di un file sono import statici, ad es. import { NgModule } from "@angular/core";
    // per essere caricato in maniera lazy, il modulo viene chiamato in modo asincrono, non utilizzo la proprietà component ma loadChidren che contiene al suo interno tutte le rotte figlie che iniziano con /courses
    // ha come valore una funzione che ritorna il modulo, cioè importiamo il modulo dinamicamente utilizzando vanilla js, il metodo import() al quale passiamo il path di quello che vogliamo importare
    // questo ci restituisce una promise, tramite .then accedo al file ed indico cosa devo esportare
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
