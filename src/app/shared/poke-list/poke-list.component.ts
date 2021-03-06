import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

import { NgxSpinnerService } from 'ngx-spinner';
import {
  BehaviorSubject,
  forkJoin,
  fromEvent,
  map,
  Observable,
  take,
} from 'rxjs';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;

  private obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private pokemons$: Observable<any> = this.obsArray.asObservable();
  
  public page: any = 0;
  public qtd: number = 10;
  public total: number = 0;

  public pokemons!: any[];

  constructor(
    private pokeApiService: PokeApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.allPokemons();
    this.getPokemonPage();

    /* this.getScrollPokemons(); */
  }

  allPokemons() {
    this.pokeApiService.apiListAllPokemons().subscribe(
      (res) => {
        this.spinner.show();
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
        this.spinner.hide();
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemons = filter;
  }

  getPokemonPage() {
    this.pokeApiService.getPokemonPaginator(this.page, this.qtd).subscribe(
      (pokemons: any) => {
        this.pokemons = pokemons.results;
        this.total = pokemons.count;
        console.log('total aeeee', pokemons.results)
        console.log('cheeeeeguei', pokemons);
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  paginate($event: any) {
    console.log($event);
    this.page = $event.page;
    this.getPokemonPage();
  }

  /* receveidPokemon(){
    this.spinner.show();
    if (!this.pokemons$){ 
    return this.pokeApiService
    .getPokemonPaginator(this.page, this.qtd)
    .subscribe((pokemons: any) => {
      this.pokemons$ = pokemons.data;
      this.total = pokemons.total;
      this.spinner.hide();
    });
    } else { 
      this.spinner.show()
      this.pokeApiService.getPokemonPaginator(this.page, this.qtd, ).subscribe((pokemons: any ) => {
        this.pokemons$ = pokemons.data;
        this.total = pokemons.total;
        this.spinner.hide();
      })
    }
  } */

  /* public getScrollPokemons() {
    this.pokeApiService
      .getScrollPokemons(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.obsArray.next(data);
        console.log('lista dos 10 pokemons', data);
      });

    const content = document.querySelector('.pokemons');
    const scroll$ = fromEvent(content!, 'scroll').pipe(
      map(() => {
        console.log('scrolling', scroll$);
        return content!.scrollTop;
      })
    );

    scroll$.subscribe((scrollPos) => {
      const limit = content!.scrollHeight - content!.clientHeight;
      if (scrollPos === limit) {
        this.currentPage += this.pageSize;
        forkJoin([
          this.pokemons$.pipe(take(1)),
          this.pokeApiService.getScrollPokemons(
            this.currentPage,
            this.pageSize
          ),
        ]).subscribe((data: Array<Array<any>>) => {
          const newArr = [...data[0], ...data[1]];
          this.obsArray.next(newArr);

          console.log('testeeee', newArr);
        });
      }
    });
  } */
}
