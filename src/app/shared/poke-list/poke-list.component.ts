import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;

  constructor(
    private pokeApiService: PokeApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {    
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.spinner.show();
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;           
        this.spinner.hide()
      },
      error => {
        this.apiError = true;
      }
      );     
  }  

  public getSearch(value: string){
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });    
    this.getAllPokemons = filter;
    
  }

}


