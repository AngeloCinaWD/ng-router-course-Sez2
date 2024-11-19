import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoadingService } from "./loading.service";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from "@angular/router";

@Component({
  selector: "loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent implements OnInit {
  @Input()
  routing: boolean = false;

  // creo un nuovo @Input booleano per sapere se il routing è in funzione
  @Input()
  detectRoutingOnGoing: boolean = false;

  // isFetching: boolean = false;

  // inietto il service loadingService e il Router di ng
  constructor(public loadingService: LoadingService, private router: Router) {}

  ngOnInit() {
    // this.loadingService.loading$.subscribe((val) => console.log(val));
    // la proprietà events mi permette di accedere al lifeCycle hook del router, restituisce un observable quindi mi devo sottoscrivere e capire che tipo di evento viene triggerato
    // a me interessa sapere quando la navigazione inizia e quando finisce, in modo da attivare lo spinner di caricamento

    // se voglio attivare il controllo di stato della navigazione passo true dal template app.component.html
    if (this.detectRoutingOnGoing) {
      this.router.events.subscribe((event) => {
        // gestito con le istanze
        // per attivare lo spinner quando viene attivato un lazy loading dal router utilizzo l'evento RouteConfigLoadStart, in questo modo avrò lo spinner in qualunque rotta courses module
        if (
          event instanceof NavigationStart ||
          event instanceof RouteConfigLoadStart
        ) {
          console.log(event.type);
          // se l'evento è un istanza di NavigationStart faccio emettere all'observable nel LoadingService valore true
          this.loadingService.loadingOn();
          // this.isFetching = true;
        }
        // lo spinner deve essere disattivato in diversi casi: fine navigazione, errore e se la rotta viene cancellata
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd
        ) {
          // console.log(event.type);
          // se l'evento è un istanza di NavigationEnd faccio emettere all'observable nel LoadingService valore false
          this.loadingService.loadingOff();
          // this.isFetching = false;
        }
        // gestito con i valori di type
        // if (event.type === 0) {
        //   this.loadingService.loadingOn();
        // } else if (event.type === 1) {
        //   this.loadingService.loadingOff();
        // }
      });
    }
  }
}
