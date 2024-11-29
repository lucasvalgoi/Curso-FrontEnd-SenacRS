//pega no document pelo Id o elemento 'searchButton' e adiciono um evento 'click' a ele, para que toda que vez que for clicado no botão de buscar, possa ser realizada a função
document.getElementById('searchButton').addEventListener('click', () => {
    //cria uma variável para acessar no document o elemento 'pokemonName' pelo Id, trazendo o seu valor e passando para Lower Case
    let pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    //request GET é feita na API, passando a variável do pokemonName para ser buscado o nome(ou o ID) do pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        //transforma a resposta da promise em JSON
        .then(response => response.json())
        //usa o parâmetro criado (data) para armazenar os dados que vierem da API
        .then(data => {
            // Manipulando o DOM para exibir as informações
            //pega o texto do conteúdo do elemento 'pokemonTitle' pelo Id, atribui para o nome que está em 'data' e transforma tudo para Upper Case
            document.getElementById('pokemonTitle').textContent = data.name.toUpperCase();
            //pega o conteúdo do src do elemento 'pokemonImage' pelo Id, atribui para o 'front_default' que está em 'sprites' e que ambos estão armazenados em 'data'
            document.getElementById('pokemonImage').src = data.sprites.front_default;
            //pega o texto do conteúdo do elemento 'pokemonType' pelo Id, atribui o 'type' que está em 'data'
            document.getElementById('pokemonType').textContent = `Tipo(s): ${data.types.map(type => type.type.name).join(', ')}`;//o '.map()' é usado para usar o parâmetro 'type' e mapear o nome dos types que vem da API e o '.join(', ')' é usado para fazer a separação desses tipos
            
            // Exibindo as estatísticas
            //é mapeado dentro das 'stats' o nome e o valor(base_stat) através do parâmetro 'stat'
            let stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
            //pega o texto do conteúdo do elemento 'pokemonStats' pelo Id, e atribui as estatísticas para esse elemento
            document.getElementById('pokemonStats').textContent = `Estatísticas: ${stats}`;
        })

        //é feito um tratamento dos erros, é emitido um 'alert()' com a informação de Pokémon não encontrado e emite no console com a mensagem do erro
        .catch(error => {
            alert('Pokémon não encontrado!');
            console.error('Erro:', error);
        });
});