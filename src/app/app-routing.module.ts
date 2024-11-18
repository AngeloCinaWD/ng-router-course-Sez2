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
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

// questa app contiene un modulo separato relativo ai courses, questo contiene services, componenti, un suo router etc
// questo modulo vogliamo che sia caricato in lazy loading, cioè che venga caricato solo quando se ne ha realemnte bisogno, solo quando accediamo in qualche parte di app che ne ha bisogno
// la prima cosa da fre per attivare in maniera pigra un modulo tramite router è definire l'activation path del router. Nel caso del modulo courses questo deve essere attivato solo quando si ha una rotta che inizia con /courses
const routes: Routes = [
  // la prima rotta che definisco è quella relativa alla root dell'app, quindi quella con path localhost:4200/
  // il path lo indico con stringa vuota
  // tramite redirectTo facciamo in modo che a questa path si venga reindirizzati a courses
  // per far funzionare questo redirect va impostata la proprietà pathMatch su full, cioè l'url deve essere completamente uguale al path indicato, altrimenti si avrebbero problemi perchè angular cercherebbe di default l'inizio dei path
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
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
  // aggiungo la rotta per la oage-not-found, error 404
  // utilizzo la wild card ** che sta ad indicare qualsiasi path non indicato in precedenza nelle altre rotte
  //  è importante che questa rotta venga definita alla fine, perchè la wild card doppio asterisco prende qualsiasi valore inserito nell'url, quindi, se messa all'inizio, vorrebbe dire che qualsiasi cosa io scriva mi riporterebbe alla pagenotfound, anche se scrivessi login o courses. Questo perchè la lettura delle rotte va dall'alto verso il basso e la prima rotta trovata che matcha con quella passta nell'url viene utilizzata
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
