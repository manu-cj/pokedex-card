vue.<template>
  <header>
    <h1>Pokédex</h1>
    <div id="searchDiv">
        <input type="search" id="searchBar" placeholder="Rechercher un pokémon">
        <button id="searchIcon">🔍</button>
    </div>
  </header>
</template>

<script>
export default {

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