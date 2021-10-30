import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    pageSize = this.pageSizeOptions[0];
    sortOptions = ['Name', 'Height', 'Weight'];
    selectedSort: string = this.sortOptions[0];
    isLoading = false;
    searchText = '';
    currentSessionStore = {
        page: this.currentPage,
        pageSize: this.pageSize,
        searchText: this.searchText,
        sortOption: this.selectedSort,
    };
    constructor(private pokemonService: PokemonService) {}

    ngOnInit(): void {
        let readCurrentSession = JSON.parse(localStorage.getItem('pokemon') || '');
        if (readCurrentSession !== '') {
            this.pageSize = readCurrentSession['pageSize'];
            this.currentPage = readCurrentSession['page'];
            this.searchText = readCurrentSession['searchText'];
            this.selectedSort = readCurrentSession['sortOption'];
        }
        this.getPokemons();
    }
    //event: On next or previous page click
    pageChanged(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.currentSessionStore['page'] = this.currentPage;
        this.currentSessionStore['pageSize'] = this.pageSize;

        localStorage.setItem('pokemon', JSON.stringify(this.currentSessionStore));
        this.getPokemons();
    }

    //event: On sort option change
    onSortOptionChange() {
        this.searchPokemon();
    }

    //method :search pokemonlist
    searchPokemon() {
        let searchedResult = [];
        let value = this.searchText;
        this.currentSessionStore['searchText'] = this.searchText;
        this.currentSessionStore['sortOption'] = this.selectedSort;
        localStorage.setItem('pokemon', JSON.stringify(this.currentSessionStore));
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
        searchedResult = searchedResult.sort((a, b) => this.sortDynamic(a, b));
        this.pokemonList = searchedResult;
    }

    //Method: to sort the data dyanmically based on the type of the data either string or number)
    sortDynamic(a: any, b: any) {
        const sortOrder = 1;
        let key = this.selectedSort.toLowerCase();
        const A = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
        const B = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
        if (A < B) {
            return sortOrder * -1;
        } else if (A > B) {
            return sortOrder * 1;
        } else {
            return 0;
        }
    }
    //Http method: to get the pokemons data
    getPokemons() {
        this.pokemonList = [];
        this.originalList = [];
        this.isLoading = true;
        this.pokemonService
            .getPokemonList(this.pageSize, this.pageSize * this.currentPage)
            .subscribe((response: any) => {
                this.totalCount = response.count;
                const pokemansResult = response.results;
                response.results.forEach((eachResult: any) => {
                    this.pokemonService.getPokemonData(eachResult.name).subscribe((response: any) => {
                        this.pokemonList.push(response);
                        this.pokemonService.pokemons.push(response);
                        if (this.pokemonList.length == pokemansResult.length) {
                            this.originalList = [...this.pokemonList];
                            this.searchPokemon();
                            this.isLoading = false;
                        }
                    });
                });
            });
    }
}
