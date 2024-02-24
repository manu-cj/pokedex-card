<template>
<main v-if="filterPokemon === ''">
    <div class="cards" v-for="(pokemonData, index) in pokemonData" :key="index" :class="pokemonData.apiTypes[0].name.toLowerCase()+'Cards'" :style="{backgroundImage: 'url('+pokemonData.apiTypes[0].image+')'}">
        <div class="idPokedex">
            <h3 class="pokemonName">{{pokemonData.name}}</h3>
            <h2>{{pokemonData.pokedexId}}</h2>
        </div>
        <img :src="pokemonData.image" width="60%" />
        <div class="display-types">
            <div class="pokemonType" v-for="type in pokemonData.apiTypes" :key="type">
                <p :class="type.name" :style="{color: 'white'}">{{type.name}}</p>
            </div>
        </div>
        <div class="stats">
            <p> PV : {{pokemonData.stats.HP}}</p>
            <p> Attaque: {{pokemonData.stats.attack}}</p>
            <p> Defense: {{pokemonData.stats.defense}}</p>
            <p> Attaque spécial: {{ pokemonData.stats.special_attack }} </p>
            <p> Defense spécial: {{ pokemonData.stats.special_defense }} </p>
            <p> Vitesse: {{ pokemonData.stats.speed}}</p>
        </div>
    </div>
</main>
<main v-if="filterPokemon !== ''">
    <div class="cards" v-for="(filterPokemon, index) in filterPokemon" :key="index" :class="filterPokemon.apiTypes[0].name.toLowerCase()+'Cards'" :style="{backgroundImage: 'url('+filterPokemon.apiTypes[0].image+')'}">
        <div class="idPokedex">
            <h3 class="pokemonName">{{filterPokemon.name}}</h3>
            <h2>{{filterPokemon.pokedexId}}</h2>
        </div>

        <img :src="filterPokemon.image" width="60%" />
        <div class="display-types">
            <div class="pokemonType" v-for="type in filterPokemon.apiTypes" :key="type">
                <p :class="type.name">{{type.name}}</p>
            </div>
        </div>
        <div class="stats">
            <p> PV : {{filterPokemon.stats.HP}}</p>
            <p> Attaque: {{filterPokemon.stats.attack}}</p>
            <p> Defense: {{filterPokemon.stats.defense}}</p>
            <p> Attaque spécial: {{ filterPokemon.stats.special_attack }} </p>
            <p> Defense spécial: {{ filterPokemon.stats.special_defense }} </p>
            <p> Vitesse: {{ filterPokemon.stats.speed}}</p>
        </div>
    </div>

</main>
</template>

<script>
import {
    mapState,
    mapGetters
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            pokemonFilter: this.$store.state.pokemonName,
            pokemonData: '',
            pokename: this.propsData,
            filterPokemon: '',
            pokeliste: [],
            poke: this.$store.state.pokelistes

        }
    },

    computed: {
        pokeName() {
            return this.$store.state.pokemonName
        },

        ...mapState([
            'title',
            'count',
            'user',
            'pokemonName',
            'pokemonDataStore',
            'pokelistes'
        ]),
        ...mapGetters(['pokemonName'])

    },
    props: {
        propsData: String
    },

    watch: {
        '$store.state.pokemonName'(newVal, oldVal) {
            if (newVal != oldVal) {
                this.pokename = newVal

            }
        },
        pokename(newVal, oldVal) {
            if (this.pokename !== '') {
                this.filteredPokemons()
            }
            if (oldVal !== newVal) {
                this.filteredPokemons()
            }
        }

    },

    methods: {
        getPokemon() {
            axios.get('https://pokebuildapi.fr/api/v1/pokemon')
                .then(response => {
                    this.pokemonData = response.data
                    response.data.forEach(element => {
                        this.pokeliste.push({
                            'name': element.name,
                            'sprite': element.sprite,
                        });
                        this.pokelistes.push({
                            'name': element.name,
                            'sprite': element.sprite,
                            'stats': element.stats,
                            'apiTypes': element.apiTypes,
                            'pokedexId': element.pokedexId,
                            'image': element.image

                        });
                    });

                })
                // en cas de réussite de la requête
                .catch(function (error) {
                    // en cas d’échec de la requête
                    console.log(error);
                });
        },
        filteredPokemons() {

            if (this.pokename !== null) {
                if (this.pokename !== '') {
                    const filterText = this.pokename.toLowerCase();
                    return this.filterPokemon = this.poke.filter(pokemon => pokemon.name.toLowerCase().includes(filterText));
                }
            }
            if (this.pokename === null) {
                return this.filterPokemon = '';
            }
        },

        

    },

    beforeUpdate() {
        this.poke = this.$store.state.pokelistes
        this.pokeName

    },
    mounted() {
        this.getPokemon();
        
    }

}
</script>

<style>
main {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    align-content: space-between;
    text-align: center;
    background-color: rgba(226, 223, 223, 0.89);
    z-index: 0;
    margin-top: 200px;
}

.cards {
    width: 20%;
    height: 500px;
    color: aliceblue;
    background-color: rgb(162, 168, 168);
    border-radius: 5%;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: 80%;
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
    
}

.cards:hover {
    filter: brightness(1.40);

    opacity: 1;
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    cursor: pointer;
    animation: brillance 2.5s linear;
    animation-iteration-count: infinite;

}

@keyframes brillance {
    from {
        box-shadow: 0 0 6px 3px #fff,
        0 0 16px 10px rgba(216, 123, 216, 0.521),
            0 0 14px 9px #0ff;
            filter: brightness(1);
            
    }

    50% {
        box-shadow:
        0 0 16px 10px rgb(0, 167, 117),
            0 0 14px 9px #0ff
        ;
        filter: brightness(1.30);
    }

    to {
        box-shadow: 0 0 6px 3px #fff,
        0 0 14px 9px rgb(0, 167, 117),
            0 0 10px 6px #0ff;
            filter: brightness(1);
        
    }
}

.poisonCards {
    border: 5px solid purple;
    background-color: rgba(128, 0, 128, 0.192);

}

.planteCards {
    border: 5px solid green;
    background-color: rgba(48, 245, 30, 0.288);
}

.acierCards {
    border: 5px solid gray;
    background-color: rgba(85, 87, 84, 0.288);
}

.combatCards {
    border: 5px solid orangered;
    background-color: rgba(255, 136, 0, 0.671);
}

.dragonCards {
    border: 5px solid rgb(60, 95, 211);
    background-color: rgba(60, 95, 211, 0.438);
}

.eauCards {
    border: 5px solid rgb(0, 134, 223);
    background-color: rgba(5, 132, 206, 0.438);
}

.électrikCards {
    border: 5px solid rgb(219, 223, 0);
    background-color: rgba(255, 251, 5, 0.212);
}

.féeCards {
    border: 5px solid rgb(230, 129, 240);
    background-color: rgba(228, 169, 223, 0.212);
}

.feuCards {
    border: 5px solid rgb(219, 45, 45);
    background-color: rgba(248, 0, 0, 0.411);
}

.glaceCards {
    border: 5px solid rgb(45, 219, 210);
    background-color: rgba(5, 255, 255, 0.411);
}

.insecteCards {
    border: 5px solid rgb(102, 199, 45);
    background-color: rgba(109, 168, 49, 0.411);
}

.normalCards {
    border: 5px solid rgb(255, 255, 255);
    background-color: rgba(150, 147, 147, 0.685);
}

.psyCards {
    border: 5px solid rgb(181, 1, 187);
    background-color: rgba(219, 0, 219, 0.411);
}

.rocheCards {
    border: 5px solid rgb(105, 91, 70);
    background-color: rgba(133, 91, 37, 0.411);
}

.solCards {
    border: 5px solid rgb(131, 78, 0);
    background-color: rgba(190, 108, 0, 0.644);
}

.spectreCards {
    border: 5px solid rgb(72, 0, 131);
    background-color: rgba(98, 0, 190, 0.644);
}

.ténèbresCards {
    border: 5px solid rgb(49, 48, 49);
    background-color: rgba(0, 0, 0, 0.678);
}

.volCards {
    border: 5px solid rgb(94, 155, 179);
    background-color: rgba(145, 233, 255, 0.678);
}

.idPokedex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-right: 10px;

}

.pokemonName {
    width: 70%;
    border-top-right-radius: 20px;
    background-color: rgba(104, 104, 104, 0.411);
}

.display-types {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.stats {
    width: 100%;
    height: 60%;
    margin-top: 5%;
    background-color: rgba(104, 104, 104, 0.411);
    border-top: 4px rgb(255, 255, 255) ridge;
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-weight: 600;
}

.pokemonType {
    width: 40%;
    border: 2px rgb(255, 255, 255) solid;
    border-radius: 10px;

}

.Plante {
    background-color: green;
    font-weight: 600;
    border-radius: 10px;
}

.Poison {
    background-color: rgb(130, 10, 167);
    font-weight: 600;
    border-radius: 10px;
}

.Acier {
    background-color: rgb(143, 179, 185);
    font-weight: 600;
    border-radius: 10px;
}

.Combat {
    background-color: orangered;
    font-weight: 600;
    border-radius: 10px;
}

.Dragon {
    background-color: rgb(60, 95, 211);
    font-weight: 600;
    border-radius: 10px;
}

.Eau {
    background-color: rgb(0, 140, 255);
    font-weight: 600;
}

.Électrik {
    background-color: rgb(177, 174, 1);
    font-weight: 600;
    border-radius: 10px;
}

.Fée {
    background-color: rgb(219, 130, 219);
    font-weight: 600;
    border-radius: 10px;
}

.Feu {
    background-color: red;
    font-weight: 600;
    border-radius: 10px;
}

.Glace {
    background-color: aqua;
    font-weight: 600;
    border-radius: 10px;
}

.Insecte {
    background-color: rgb(96, 129, 45);
    font-weight: 600;
    border-radius: 10px;
}

.Normal {
    background-color: grey;
    font-weight: 600;
    border-radius: 10px;
}

.Psy {
    background-color: rgb(176, 44, 216);
    font-weight: 600;
    border-radius: 10px;
}

.Roche {
    background-color: rgb(129, 105, 68);
    font-weight: 600;
    border-radius: 10px;
}

.Sol {
    background-color: rgb(207, 132, 82);
    font-weight: 600;
    border-radius: 10px;
}

.Spectre {
    background-color: rgb(75, 3, 143);
    font-weight: 600;
    border-radius: 10px;
}

.Ténèbres {
    background-color: rgb(48, 46, 46);
    font-weight: 600;
    border-radius: 10px;
}

.Vol {
    background-color: rgb(70, 104, 136);
    font-weight: 600;
    border-radius: 10px;
}
</style>
