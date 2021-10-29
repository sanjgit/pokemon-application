import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
    pokemonList: any[] = [];
    originalList: any[] = [];
    totalCount = 0;
    currentPage = 0;
    pageSizeOptions = [5, 20, 50];
    pageSize = this.pageSizeOptions[2];

    searchText = '';
    constructor(private pokemonService: PokemonService) {}

    ngOnInit(): void {
        this.getPokemons();
    }

    searchPokemon() {
        let searchedResult = [];
        let value = this.searchText;
        for (var i = 0; i < this.originalList.length; i++) {
            let lowerCaseName = this.originalList[i].name.toLowerCase();
            if (lowerCaseName.includes(value.toLowerCase())) {
                searchedResult.push(this.originalList[i]);
            } else if (this.originalList[i].abilities.length > 0) {
                for (var j = 0; j < this.originalList[i].abilities.length; j++) {
                    let lowerCaseAbility = this.originalList[i].abilities[j].ability.name.toLowerCase();
                    if (lowerCaseAbility.includes(value.toLowerCase())) {
                        searchedResult.push(this.originalList[i]);
                        break;
                    }
                }
            }
        }
        this.pokemonList = searchedResult;
    }

    getPokemons() {
        this.pokemonList = [];
        this.pokemonService.getPokemonList(this.pageSize, this.currentPage + 0).subscribe((response: any) => {
            this.totalCount = response.count;
            const pokemansResult = response.results;
            response.results.forEach((eachResult: any) => {
                this.pokemonService.getPokemonData(eachResult.name).subscribe((response: any) => {
                    this.pokemonList.push(response);
                    this.pokemonService.pokemons.push(response);
                    if (this.pokemonList.length == pokemansResult.length) {
                        this.originalList = [...this.pokemonList];
                        this.searchPokemon();
                    }
                });
            });
        });
    }
}
