import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
    selector: 'app-detail-view',
    templateUrl: './detail-view.component.html',
    styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent implements OnInit {
    pokemon: any = null;

    subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

    set subscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params) => {
            debugger;
            if (this.pokemonService.pokemons.length) {
                this.pokemon = this.pokemonService.pokemons.find((i) => i.name === params.name);
                if (this.pokemon) {
                    return;
                }
            }

            this.subscription = this.pokemonService.getPokemonData(params.name).subscribe(
                (response) => {
                    this.pokemon = response;
                },
                (error) => console.log('Error Occurred:', error)
            );
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => (subscription ? subscription.unsubscribe() : 0));
    }
}
