let results;

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.response);
    };
    xhr.setRequestHeader('check', 'true');
    xhr.send();
    return xhr;
}


function setSearch(){
    let search = document.querySelector('#user');
    let result = document.querySelector('#result');

    if (search.value.length >= 2) {
        getAjax(`/search/${search.value}`, function(data) {
            let people = JSON.parse(data);
            result.innerHTML = null;

            people.forEach(person => {
                let div = document.createElement('div');
                div.innerText = person.name;
                result.appendChild(div)
            })
        });
    }
}

function searchConnection() {
    let search = document.querySelector('#user');
    let searchCon = document.querySelector('#conn');
    let result = document.querySelector('#result');

    if (search.value.length >= 2 && searchCon.value) {
        getAjax(`/search/${search.value}/${searchCon.value}`, function(data) {
            let people = JSON.parse(data);
            result.innerHTML = null;

            people.forEach(person => {
                let div = document.createElement('div');
                div.innerText = person.name;
                result.appendChild(div)
            })
        });
    }
}