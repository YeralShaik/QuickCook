//Api

async function fetchData(){
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log('Error:', error);
    }
}

fetchData();

function GetCategory (){
    const img =  document.querySelector('img-Category')

    img.


}

