import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { PokemonService } from './pokemon.service';
export function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}
describe('PokemonService', () => {
    let httpMock: HttpTestingController;
    let httpClientSpy: { get: jasmine.Spy };
    let httpClient: HttpClient;
    let service: PokemonService;
    let originalTimeout: any;
    let pokemonDetails = { name: 'bulbasaur' };
    let resultPokemons = {
        results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
            { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
            { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        ],
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        httpClient = TestBed.inject(HttpClient);
        service = TestBed.inject(PokemonService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpMock.verify();
    });

    it('getPokemonList(limit,offset) should return data', () => {
        httpClient.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0').subscribe((data) =>
            // When observable resolves, result should match test data
            expect(data).toEqual(resultPokemons)
        );

        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');
        expect(req.request.method).toEqual('GET');
        req.flush(resultPokemons);
        httpMock.verify();
    });
    it('getPokemonData(name) should return data', () => {
        httpClient.get('https://pokeapi.co/api/v2/pokemon/bulbasaur').subscribe((data) =>
            // When observable resolves, result should match test data
            expect(data).toEqual(pokemonDetails)
        );

        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
        expect(req.request.method).toEqual('GET');
        req.flush(pokemonDetails);
        httpMock.verify();
    });
});
