function calculateFertilizer() {
    const cropType = document.getElementById("crop-type").value;
    const soilType = document.getElementById("soil-type").value;
    const fertilizerReq = document.getElementById("fertilizer-req").value;
  
    // Perform calculations based on the input parameters
    const fertilizerAmount = predictFertilizerAmount(cropType, soilType, fertilizerReq);
  
    // Display the results
    document.getElementById("result").innerHTML =`The recommended fertilizer amount is ${fertilizerAmount.toFixed(2)} kg.`;
}
  
function predictFertilizerAmount(cropType, soilType, fertilizerReq) {
    let baseFertilizer = fertilizerReq;
    
    // Predictive adjustments based on crop type
    switch(cropType) {
        case "rice":
            baseFertilizer *= 1.2;
            break;
        case "wheat":
            baseFertilizer *= 1.5;
            break;
        case "corn":
            baseFertilizer *= 1.4;
            break;
        case "soybean":
            baseFertilizer *= 1.3;
            break;
        case "barley":
            baseFertilizer *= 1.1;
            break;
        default:
            baseFertilizer *= 1.0;
    }
    
    // Predictive adjustments based on soil type
    switch(soilType) {
        case "clay":
            baseFertilizer *= 1.1;
            break;
        case "sandy":
            baseFertilizer *= 1.3;
            break;
        case "loam":
            baseFertilizer *= 1.2;
            break;
        case "silty":
            baseFertilizer *= 1.15;
            break;
        case "peaty":
            baseFertilizer *= 1.25;
            break;
        default:
            baseFertilizer *= 1.0;
    }
    
    return baseFertilizer;
}
