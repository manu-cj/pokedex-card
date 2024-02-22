<template>
    <h2>{{pokemonDataStore}}</h2>
  <main>
    <div class="cards" v v-for="(pokemonData, index) in pokemonData" :key="index">
        <h3>{{pokemonData.name}}</h3>
        <img :src="pokemonData.image" width="80%" />
    </div>
    
  </main>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'


export default {
    data() {
        return {
            pokemonFilter : this.$store.state.pokemonName,
            pokemonData : '',
            pokename : this.$store.state.pokemonName,
            filterPokemon : [this.$store.state.pokemonName]
        }
    },


    computed: {
        pokeName(){
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

    watch : {
        '$store.state.pokemonName'(newVal, oldVal) {
                if(newVal !== oldVal) {
                    console.log(this.pokemonData)
                    console.log(this.$store.state.pokemonName)
                    this.getPokemon()
                }
        }

    },

    methods: {
       getPokemon() {    
        axios.get('https://pokebuildapi.fr/api/v1/pokemon')
                .then(response=> {
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
        this.pokesearch;
        
        
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
    width: 15%;
    height: 300px;
    border: 3px green solid;
    margin: 30px;
}
</style>