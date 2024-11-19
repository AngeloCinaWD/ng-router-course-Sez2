// la classe che esporto implementa l'interfaccia Resolve del Router
// questa prende un generico tipo che dipende dal tipo di dato che il resolver sta andando a prendere dal backend
// il tipo è fornito dal componente target, in questo caso il tipo è un'istanza del Course component
// questo resolver deve essere fornito inserendolo nei providers del routing module

// l'interfaccia Resolve è deprecata
// vedere ResolveFn di angular

import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Course } from "../model/course";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { first } from "rxjs/operators";

// dato che è un service ho bisogno dell'Injectable decorator
@Injectable()
export class CourseResolver implements Resolve<Course> {
  // abbiamo bisogno del courses.service, lo iniettiamo tramite costruttore
  // questo ha un metodo loadCourseByUrl che restituisce un observable che è il corso che cerco, emette un solo valore quindi è un observable con proprietà complete
  constructor(private coursesService: CoursesService) {}
  // l'unico metodo da implementare è il resolve(), gli facciamo ritornare un Observable
  //   questo observable dovrà contenere un value da emettere e soprattutto dovrà essere complete
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    // l'url da passare a questo metodo lo dobbiamo estrarre dalla rotta
    // utilizziamo il parametro route e il metodo paramMap ed il nome che ho dato alla Path Variable al momento della descrizione della rotta (quello indicato con i :courseUrl)
    // per accedere alle path variables utilizzo il paramMap
    const courseUrl: string = route.paramMap.get("courseUrl");

    // per accedere ai query parameters utilizzo queryParamMap
    // console.log(route.queryParamMap.get("couponCode"));

    //  in caso l'observable restituito dal metodo emetta più di un valore, lo posso costringere a emetterne uno solo e poi completarsi, tramite l'utiizzo dell'operatore RxJS first(), in questo caso non serve
    // return this.coursesService.loadCourseByUrl(courseUrl).pipe(first());
    return this.coursesService.loadCourseByUrl(courseUrl);
  }
}
