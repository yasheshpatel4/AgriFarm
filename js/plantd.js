function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const affects = document.getElementById('affects').value;
    const location = document.getElementById('location').value;
    
    // Example data for diseases
    const diseases = [
        { name: 'Disease 1', img: 'images/disease1.jpg', affects: 'fruit', location: 'soil' },
        { name: 'Disease 2', img: 'images/disease2.jpg', affects: 'flowers', location: 'greenhouse' }
        // Add more disease objects
    ];
    const cardsContainer = document.getElementById('disease-cards');
    cardsContainer.innerHTML = ''; // Clear cards

    diseases.forEach(disease => {
        if ((search === '' || disease.name.toLowerCase().includes(search)) &&
            (affects === '' || disease.affects === affects) &&
            (location === '' || disease.location === location)) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${disease.img}" alt="${disease.name}">
                <h3>${disease.name}</h3>
                <button onclick="viewDisease('${disease.name}')">Show</button>
            `;
            cardsContainer.appendChild(card);
        }
    });
}

function viewDisease(name) {
    window.location.href = `disease.html?name=${encodeURIComponent(name)}`;
}
