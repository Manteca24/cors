const getCharacterInfo = () => {
    const characterNameInput = document.getElementById("characterName");
    const characterInfo = document.getElementById("characterInfo");

    const characterName = characterNameInput.value;

    fetch(`http://localhost:3000/characters/${characterName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Personaje no encontrado');
            }
            return response.json();
        })
        .then(data => {
            characterInfo.innerHTML = '';  
            data.forEach(character => {
                const { name, status, species, gender, origin, image } = character;
                characterInfo.innerHTML += `
                    <div class="character-card">
                        <h2>${name}</h2>
                        <img src="${image}" alt="${name}" />
                        <p>Status: ${status}</p>
                        <p>Species: ${species}</p>
                        <p>Gender: ${gender}</p>
                        <p>Origin: ${origin.name}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            characterInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
};
