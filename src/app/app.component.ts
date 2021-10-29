import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from './services/pokemon.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'pokemon-app';
    constructor(private router: Router, private pokemonService: PokemonService) {}
    showBackButton() {
        if (this.router.url.startsWith('/view')) {
            return true;
        } else {
            return false;
        }
    }
}
