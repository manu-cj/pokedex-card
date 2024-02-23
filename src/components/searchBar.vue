<template>
  <header>
    <h1>Pokédex</h1>
    <div id="searchDiv">
        <input type="search" id="searchBar" placeholder="Rechercher un pokémon" v-model="name">
        <button id="searchIcon" @input="getPokemonWhitName()">🔍</button>
    </div>
  </header>
 

  
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name : '',
            searchName: '',
            
        }
    },

    computed: {
       
    },

    methods: {
        getPokemonWhitName() {    
            axios.get('https://pokebuildapi.fr/api/v1/pokemon/'+ this.$store.state.pokemonName)
                .then(response=> {
                    this.searchName = response.data
                    console.log(response.data)
                    this.$store.commit('SET_POKEMON_DATA_STORE', response.data);
                    
                })
                    // en cas de réussite de la requête
                .catch(function (error) {
                    // en cas d’échec de la requête
                    console.log(error);
                });
       }
    },

    watch: {
        '$store.state.pokemonName'(newVal, oldVal) {
                if(newVal !== oldVal) {
                    console.log(this.$store.state.pokemonName)
                    this.getPokemonWhitName()
                }
        }
    },

       
    
    
    beforeUpdate() {
        
        this.$store.commit('SET_POKEMON', this.name);
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
}

#searchDiv {
    position: relative;
}

#searchBar {
    width: 20%;
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

</style>