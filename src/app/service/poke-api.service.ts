import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Observable
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=5';

  constructor(private http: HttpClient) {}

  apiListAllPokemons() {
    return this.http.get<any>(this.url).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemons(resPokemons.url).subscribe(
            (res) => (resPokemons.status = res)
          );
        });
      })
    );
  }

  getPokemonPaginator(page: number, qtd: number){
    return this.http.get<any>(`${environment.url_pokemon}pokemon?offset=${page}&limit=${qtd} `)
  }
  
  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }
  
  public getScrollPokemons(pageNumber: number, pageSize: number) {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${pageNumber}&limit=${pageSize}`
      );
    }
    /* receveidPokemonPage(page: number, qtd: number):Observable<any> {
      return this.http.get<any>(
        `${environment.url_pokemon}/pokemon?offset=${page}&limit=${qtd}`
      ).pipe(tap ((res) => res),
      tap((res) => {
        res.result.map((resPokemon: any) => {
          this.apiGetPokemons(resPokemon.url).subscribe(
            (res) => (resPokemon.status = res)
          );
        });
      })
      );
    } */
  }
