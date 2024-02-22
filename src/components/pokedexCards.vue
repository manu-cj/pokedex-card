<template>
  <main>
    <h1>Je fait une pause</h1>
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
            pokemonFilter : '',
            pokemonData : ''
        }
    },


    computed: {
        ...mapState([
        'title',
        'count',
        'user'
    ]),

    },

    watch : {

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
       }
    },

    beforeUpdate() {
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