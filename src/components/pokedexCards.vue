<template>
<main v-if="pokemonDataStore === ''">
    
    <div class="cards" v-for="(pokemonData, index) in pokemonData" :key="index" :class="pokemonData.apiTypes[0].name.toLowerCase()+'Cards'" :style="{backgroundImage: 'url('+pokemonData.apiTypes[0].image+')'}">
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
    color: aliceblue;
    background-color: rgb(162, 168, 168);
    border: 3px green solid;
    border-radius: 5%;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: 80%;
}

.poisonCards {
    border: solid purple;
    background-color: rgba(128, 0, 128, 0.192);
    
}
.planteCards {
    border: solid green;
    background-color: rgba(48, 245, 30, 0.288);
}
.acierCards {
    border: solid gray;
    background-color: rgba(85, 87, 84, 0.288);
}
.combatCards {
    border: solid orangered;
    background-color: rgba(255, 136, 0, 0.671);
}
.dragonCards {
    border: solid rgb(60, 95, 211);
    background-color: rgba(60, 95, 211, 0.438);
}
.eauCards {
    border:  solid rgb(0, 134, 223);
    background-color: rgba(5, 132, 206, 0.438);
}
.électrikCards {
    border:  solid rgb(219, 223, 0);
    background-color: rgba(255, 251, 5, 0.212);
}

.féeCards {
    border:  solid rgb(230, 129, 240);
    background-color: rgba(228, 169, 223, 0.212);
}

.feuCards {
    border: solid rgb(219, 45, 45);
    background-color: rgba(248, 0, 0, 0.411);
}

.glaceCards {
    border: solid rgb(45, 219, 210);
    background-color: rgba(5, 255, 255, 0.411);
}

.insecteCards {
    border: solid rgb(102, 199, 45);
    background-color: rgba(109, 168, 49, 0.411);
}

.normalCards {
    border: solid rgb(173, 173, 173);
    background-color: rgba(194, 194, 194, 0.411);
}

.psyCards {
    border: solid rgb(181, 1, 187);
    background-color: rgba(219, 0, 219, 0.411);
}

.rocheCards {
    border: solid rgb(105, 91, 70);
    background-color: rgba(133, 91, 37, 0.411);
}
.solCards {
    border: solid rgb(131, 78, 0);
    background-color: rgba(190, 108, 0, 0.644);
}

.spectreCards {
    border: solid rgb(72, 0, 131);
    background-color: rgba(98, 0, 190, 0.644);
}

.ténèbresCards {
    border: solid rgb(49, 48, 49);
    background-color: rgba(0, 0, 0, 0.678);
}

.volCards {
    border: solid rgb(94, 155, 179);
    background-color: rgba(145, 233, 255, 0.678);
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

.Électrik {
    background-color: rgb(219, 206, 17);
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
    background-color: rgb(96, 129, 45);
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
