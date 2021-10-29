import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root',
})
export class PokemonService {
    constructor(private httpClient: HttpClient) {}

    private _pokemons: any[] = [];
    get pokemons(): any[] {
        return this._pokemons;
    }
    getPokemonList(limit: number, offset: number) {
        return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    }
    getPokemonData(name: string) {
        return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    }
}
