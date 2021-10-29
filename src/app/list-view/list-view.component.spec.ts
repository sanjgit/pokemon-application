import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PokemonService } from '../services/pokemon.service';
import * as Rx from 'rxjs';
import { delay } from 'rxjs/operators';
import { ListViewComponent } from './list-view.component';

describe('ListViewComponent', () => {
    let component: ListViewComponent;
    let fixture: ComponentFixture<ListViewComponent>;
    let service: PokemonService;
    let pokemonResults: any = [
        {
            height: '100',
            weight: '200',
            name: 'venusaur',
            abilities: [
                {
                    ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
                    is_hidden: false,
                    slot: 1,
                },
                {
                    ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' },
                    is_hidden: true,
                    slot: 3,
                },
            ],
        },
        {
            height: '10',
            weight: '20',
            name: 'bulbasaur',
            abilities: [
                {
                    ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
                    is_hidden: false,
                    slot: 1,
                },
                {
                    ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' },
                    is_hidden: true,
                    slot: 3,
                },
            ],
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ListViewComponent],
            providers: [PokemonService],
        }).compileComponents();
        service = TestBed.inject(PokemonService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should fail to search data', async () => {
        fixture.detectChanges();
        expect(component.getPokemons()).toEqual(undefined);
    });
    it('should call getPokemonList and search should be empty', fakeAsync(() => {
        let spy_getPokemons = spyOn(service, 'getPokemonList').and.callFake(() => {
            return Rx.of([]).pipe(delay(100));
        });
        let spy_getPokemonDetails = spyOn(service, 'getPokemonData').and.callFake(() => {
            return Rx.of([]).pipe(delay(100));
        });
        component.pokemonList = pokemonResults;
        component.searchText = 'bulbasaur';
        component.searchPokemon();
        tick(100);
        expect(component.pokemonList).toEqual([]);
    }));
    it('should call getPokemonList and search should return value', fakeAsync(() => {
        let spy_getPokemons = spyOn(service, 'getPokemonList').and.callFake(() => {
            return Rx.of([]).pipe(delay(100));
        });
        let spy_getPokemonDetails = spyOn(service, 'getPokemonData').and.callFake(() => {
            return Rx.of([]).pipe(delay(100));
        });
        component.pokemonList = pokemonResults;
        component.originalList = pokemonResults;
        component.searchText = 'bulbasaur';
        component.searchPokemon();
        tick(100);
        expect(component.pokemonList[0]).toEqual(pokemonResults[1]);
    }));
});
