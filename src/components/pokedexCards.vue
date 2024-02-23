<template>
<main v-if="pokemonDataStore === ''">
    <div class="cards" v-for="(pokemonData, index) in pokemonData" :key="index">
        <div class="idPokedex">{{pokemonData.pokedexId}}</div>
        <h3>{{pokemonData.name}}</h3>
        <img :src="pokemonData.image" width="60%" />
        <div class="display-types">
            <div class="pokemonType" v-for="type in pokemonData.apiTypes" :key="type">
                <p :class="type.name" :style="{color: 'white'}">{{type.name}}</p>
            </div>
        </div>  
        <div class="stats">
            <p> PV :{{pokemonData.stats.HP}}</p>
            <p> Attaque: {{pokemonData.stats.attack}}</p>
            <p> Defense: {{pokemonData.stats.defense}}</p>
            <p> Attaque spécial: {{ pokemonData.stats.special_attack }} </p>
            <p> Defense spécial: {{ pokemonData.stats.special_defense }} </p>
            <p> Vitesse: {{ pokemonData.stats.speed}}</p>
        </div>
    </div>
</main>
<main v-if="pokemonDataStore !== ''">
    <div class="cards" v-for="(filterPokemon, index) in filterPokemon" :key="index">
        <div class="idPokedex">{{filterPokemon.pokedexId}}</div>
        <h3>{{filterPokemon.name}}</h3>
        <img :src="filterPokemon.image" width="60%" />
        <div class="pokemonType" v-for="type in filterPokemon.apiTypes" :key="type">
            <p :class="type.name">{{type.name}}</p>
        </div>
        <div class="stats">
            <p> PV :{{filterPokemon.stats.HP}}</p>
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
    mapState
} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            pokemonFilter: this.$store.state.pokemonName,
            pokemonData: '',
            pokename: this.$store.state.pokemonName,
            filterPokemon: '',
            
           
            
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
            'pokemonDataStore'
        ]),

    },

    watch: {
        '$store.state.pokemonDataStore'(newVal, oldVal) {
            if (newVal !== oldVal) {
                console.log(this.pokemonData)
                console.log(this.$store.state.pokemonName)
                this.filterPokemon = [this.$store.state.pokemonDataStore]
            }
        },

        

    },

    methods: {
        getPokemon() {
            axios.get('https://pokebuildapi.fr/api/v1/pokemon')
                .then(response => {
                    console.log(response.data)
                    this.pokemonData = response.data
                })
                // en cas de réussite de la requête
                .catch(function (error) {
                    // en cas d’échec de la requête
                    console.log(error);
                });
        },

    },

    beforeUpdate() {

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
}

.cards {
    width: 20%;
    height: 400px;
    border: 3px green solid;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.display-types {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.pokemonType {
    width: 40%;
    border: 2px green solid;
    border-radius: 10px;
    
}

.Plante {
    background-color: green;
    font-weight: 600;
}

.Poison {
    background-color: rgb(130, 10, 167);
    font-weight: 600;
}

.Acier {
    background-color: rgb(143, 179, 185);
    font-weight: 600;
}

.Combat {
    background-color: orangered;
    font-weight: 600;
}

.Dragon {
    background-color: rgb(60, 95, 211);
    font-weight: 600;
}

.Eau {
    background-color: rgb(0, 140, 255);
    font-weight: 600;
}

.Electrik {
    background-color: yellow;
    font-weight: 600;
}

.Fée {
    background-color: rgb(219, 130, 219);
    font-weight: 600;
}

.Feu {
    background-color: red;
    font-weight: 600;
}

.Glace {
    background-color: aqua;
    font-weight: 600;
}

.Insecte {
    background-color: greenyellow;
    font-weight: 600;
}

.Normal {
    background-color: grey;
    font-weight: 600;
}

.Psy {
    background-color: rgb(176, 44, 216);
    font-weight: 600;
}

.Roche {
    background-color: rgb(129, 105, 68);
    font-weight: 600;
}

.Sol {
    background-color: rgb(207, 132, 82);
    font-weight: 600;
}

.Spectre {
    background-color: rgb(75, 3, 143);
    font-weight: 600;
}

.Ténèbres {
    background-color: rgb(48, 46, 46);
    font-weight: 600;
}

.Vol {
    background-color: rgb(159, 203, 245);
    font-weight: 600;
}
</style>
