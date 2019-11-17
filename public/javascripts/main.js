
(function () {
    const search = document.querySelector('#user');
    const searchCon = document.querySelector('#conn');
    const searchBtn = document.querySelector('#searchBtn');
    const connectionBtn = document.querySelector('#connectionBtn');
    const sortList = document.querySelector('#sortList');

    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];
    
    let listResult;
    let sortReq;

    function getAjax(url, success) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) success(xhr.response);
        };
        xhr.setRequestHeader('check', 'true');
        xhr.send();
        return xhr;
    }


    function sorting(arr = listResult, result = document.querySelector('#result')) {
        result.innerHTML = null;
        let sorted;

        if (sortReq === 'name') {
            if (arr.person) {
                sorted = arr.sort((a, b) => (a.person.name.toLowerCase() > b.person.name.toLowerCase()) ? 1 : -1);
            } else {
                sorted = arr.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            }
        } else {
            if (arr.person) {
                sorted = arr.sort((a, b) =>  (a.person.weight > b.person.weight) ? 1 : -1);
            } else {
                sorted = arr.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
            }
        }

        return sorted.map((v, i) => {
            let person = (v.person) ? v.person : v;
            let imgSrc = (person.picture !== undefined) ? person.picture : '/images/blank-profile-picture.png';
            let userProfile = `
                <div class="profile-card">
                <a href="/${person.publicId}">
                <h2>${person.name} <small>${person.weight}</small></h2>
                <img src="${imgSrc}" alt="${person.name}'s Picture" width="123">
                <p>${person.professionalHeadline}</p>
                </a>
                </div>
            `;

            return result.append(document.createRange().createContextualFragment(userProfile));
        }).join(' ');
    }

    sortList.addEventListener('input',(e)=> {
            sortReq = e.target.value;
            sorting();
    })

    function setSearch() {
        if (search.value.length >= 2) {
            getAjax(`/search/${search.value}`, function (data) {
                let people = JSON.parse(data);
                listResult = people;
                sorting(people)
            });
        }
    }

    function searchConnection(user) {
        let result = document.querySelector('#connectionResult');

        if (searchCon.value.length >= 2) {
            getAjax(`/search/${user}/${searchCon.value}`, function (data) {
                let people = JSON.parse(data);
                sorting(people, result)
            });
        }
    }


    search.addEventListener('input', (e) => setSearch());
    searchBtn.addEventListener('click', (e) => setSearch());
    searchCon.addEventListener('input', (e) => searchConnection(document.querySelector('#username').value));
    connectionBtn.addEventListener('click', (e) => searchConnection(document.querySelector('#username').value));

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})();