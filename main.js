let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let card = document.querySelector('.card')
let itemDeleted = document.getElementById('itemDeleted')

let cookieHeading = document.getElementById('cookieHeading');

let mood = 'create';
let tmp;

function getTotal()
{
    if(price.value != '')
    {
        let result = +price.value + +taxes.value + +ads.value;
        let resultEnd = result - discount.value;
        total.innerHTML = resultEnd;  
        total.style.background = '#4AAD52';
    }else{
        total.innerHTML = '';
        total.style.background = '#084C61';
    }
}

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    // make attention in this part error
    if(newPro.title != ''){
        title.placeholder = 'Titre de Produit';
        title.style.borderBottomColor = '#1B998B';
        title.style.borderBottomWidth = '2px';
        title.classList.remove('colorred');
        if(newPro.price != ''){ 
            price.placeholder = 'Prix';
            price.style.borderBottomColor = '#1B998B';
            price.style.borderBottomWidth = '2px';
            price.classList.remove('colorred');
            executeWrite()
        }else{
            price.placeholder = 'Veuillez remplir ce champ';
            price.classList.add('colorred');
            price.style.borderBottomColor = '#D64045';
            price.style.borderBottomWidth = '2px';
        }
        
    }else{
        title.placeholder = 'Veuillez remplir ce champ';
        title.classList.add('colorred');
        title.style.borderBottomColor = '#D64045';
        title.style.borderBottomWidth = '2px';
    } 

    function executeWrite(){

        if(mood = 'update'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                    localStorage.setItem('product',  JSON.stringify(dataPro));
                }
                }else{
                dataPro.push(newPro);
                localStorage.setItem('product',  JSON.stringify(dataPro));
                mood = 'create';
                submit.innerHTML = 'Creer';
                count.style.cursor = 'pointer';
                count.style.borderBottomColor = 'black';
                }
            clearData()  
            showData()
            location.reload()
        }                
}
}
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function showData(){
    getTotal()
    let table = '';
    for(let i = 0 ; i < dataPro.length;i++){
        table += `                
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title} </td>
        <td>${dataPro[i].price} <span id='dh'>DH</span></td>
        <td>${dataPro[i].taxes} <span id='dh'>DH</span></td>
        <td>${dataPro[i].ads} <span id='dh'>DH</span></td>
        <td>${dataPro[i].discount} <span id='dh'>DH</span></td>
        <td>${dataPro[i].total} <span id='dh'>DH</span></td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateRow(${i})" id="update">Modifier</button></td>
        <td><button onclick="deleteRow(${i})" id="delete">Suprimer</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
}
showData() 
let numberdeleterow;
function deleteRow(i){
    card.style.display = 'block';
    numberdeleterow = i;
    itemDeleted.innerText = "Suprimee :"+ " " + dataPro[numberdeleterow].title + ' '+ "Prix"+ ' '+dataPro[numberdeleterow].price;
    scroll({
        top :0,
        behavior: "smooth"
    })
}
function deleteRowVerified(){
    dataPro.splice(numberdeleterow,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
    card.style.display = 'none';
}
function canceldisplay(){
    card.style.display = "none";
}

function updateRow(i){
    console.log(dataPro[i].title)
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    total.value = dataPro[i].total;
    category.value = dataPro[i].category;
    getTotal()
    count.style.cursor = 'not-allowed';
    count.style.borderBottomColor = 'red';
    submit.innerHTML = 'Modifier';
    mood = 'create';
    tmp = i;
    scroll({
        top :0,
        behavior: "smooth" 
    })
}
let table;

function searchData(value){  
    let table = '';
    for(let i=0; i < dataPro.length;i++){
        if(dataPro[i].title.includes(value) || dataPro[i].category.includes(value)){
            table +=`                
            <tr id="searchResult">
                <td >${i}</td>
                <td >${dataPro[i].title} </td>
                <td>${dataPro[i].price} <span id='dh'>DH</span></td>
                <td>${dataPro[i].taxes} <span id='dh'>DH</span></td>
                <td>${dataPro[i].ads} <span id='dh'>DH</span></td>
                <td>${dataPro[i].discount} <span id='dh'>DH</span></td>
                <td>${dataPro[i].total} <span id='dh'>DH</span></td>
                <td>${dataPro[i].category}</td>
                <td>
                    <button onclick="updateRow(${i})" id="update">Modifier</button>
                </td>
                <td><button onclick="deleteRow(${i})" id="delete">Suprimer</button></td>
            </tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}