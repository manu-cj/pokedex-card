<template>
<header>
    <h1>Pokédex</h1>
    <div id="searchDiv">
        <input type="search" id="searchBar" placeholder="Rechercher un pokémon" v-model="name" @input=" sendDataToParent(), searchActive()" @focusout="searchInactive()">
        <button id="searchIcon" @input="getPokemonWhitName()">🔍</button>
    </div>
    <div id="main-filtre-div" class="main-filtre-div" v-if="pokeFiltre !== '' ">
        <div class="main-filtre-div" v-if="pokeFiltre.length >= 3">
        <div class="filtre-div"   v-for="filtre in pokeFiltre.slice(0,3)" :key="filtre" @click="this.name = filtre.name"> 
                <p @click="this.name = filtre.name">{{filtre.name}}</p><img :src="filtre.sprite" width="10%">   
        </div>
    </div>
    <div id="main-filtre-div" class="main-filtre-div" v-if="pokeFiltre.length === 2">
        <div class="filtre-div" v-for="filtre in pokeFiltre.slice(0,2)" :key="filtre" @click="this.name = filtre.name"> 
                <p @click="this.name = filtre.name">{{filtre.name}}</p><img :src="filtre.sprite" width="10%">   
        </div>
    </div>
    <div id="main-filtre-div" class="main-filtre-div" v-if="pokeFiltre.length === 1">
        <div class="filtre-div" v-for="filtre in pokeFiltre.slice(0,1)" :key="filtre" @click="this.name = filtre.name"> 
                <p @click="this.name = filtre.name">{{filtre.name}}</p><img :src="filtre.sprite" width="10%">   
        </div>
    </div>
    </div>
    
</header>
</template>

<script>
import axios from 'axios';
import {
    resolveTransitionHooks
} from 'vue';

export default {
    data() {
        return {
            name: '',
            searchName: '',
            poke : this.$store.state.pokelistes,
            pokeFiltre : ''

        }
    },

    computed: {
        
    },
    

    methods: {
        getPokemonWhitName() {
            if (this.name !== '') {
                this.$store.commit('SET_POKEMON', this.name);
                axios.get('https://pokebuildapi.fr/api/v1/pokemon/' + this.$store.state.pokemonName)
                    .then(response => {
                        this.searchName = response.data
                        this.$store.commit('SET_POKEMON_DATA_STORE', response.data);

                    })
                    // en cas de réussite de la requête
                    .catch(function (error) {
                        // en cas d’échec de la requête
                        console.log(error);
                    });
            }
            else {
                this.$store.commit('SET_POKEMON_DATA_STORE', '');
            }
        },
        filteredPokemons(){
            if(this.name !== '') {
                const filterText = this.name.toLowerCase();
          return this.pokeFiltre = this.poke.filter(pokemon => pokemon.name.toLowerCase().includes(filterText));
            }
            if(this.name === ''){
                return this.pokeFiltre = ''
            }
        },
        sendDataToParent() {
      // Emit a custom event with the data
      this.$emit('child-to-parent', this.name);
    },
    searchActive(){
        if (this.name.length > 0 ) {
            document.getElementById('main-filtre-div').style.opacity = 1;
        }
        
    },
    searchInactive(){
        if (this.name.length > 0 ) {
            document.getElementById('main-filtre-div').style.opacity = 0;
        }
        
    }
        
        

    },

    watch: {
        '$store.state.pokemonName'(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getPokemonWhitName()
            }
            if (newVal === '') {
                this.$store.commit('SET_POKEMON', null);

            }
        },
        name(newVal, oldVal){
            if(newVal !== oldVal){
                this.$store.commit('SET_POKEMON', this.name);
            }
        }
        
    },

    beforeUpdate() {
        this.$store.commit('SET_POKEMON', this.name);
        if (resolveTransitionHooks.name === '') {
            this.$store.commit('SET_POKEMON', null);
        }
        this.filteredPokemons()

    },

    mounted() {
        this.getPokemonWhitName()
    }

}
</script>

<style>
header {
    width: 100%;
    height: 150px;
    background-color: teal;
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-evenly;
    position: fixed;
    z-index: 1;
}

#searchDiv {
    position: relative;
}

#searchBar {
    padding: 5px;
    width: 300px;
    border-radius: 8px;
    border: none;
    font-size: larger;
}

#searchBar:focus {

    outline-color: rgba(204, 117, 59, 0.808);
    font-weight: bold;
    color: rgb(5, 131, 89);

}

#searchIcon {
    position: absolute;
    padding: 3px;
    z-index: 1;
    background-color: rgb(255, 255, 255);
    border: none;
    right: 3px;
    top: 3px;
    border-radius: 0 5px 5px 0;

}
#main-filtre-div {
    opacity: 0;
}
.main-filtre-div {
    width: 310px;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    border-radius: 8px;
    

}

.filtre-div {
    width: 100%;
    height: 20px;
    background-color: aliceblue;
    border-bottom: 1px  black solid;
    border-radius: 8px;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-content: space-around;
    padding: 6px;
    font-weight: 600;
}

.filtre-div:hover {
    cursor: pointer;
    background-color: rgba(65, 65, 65, 0.205);
}
</style>
