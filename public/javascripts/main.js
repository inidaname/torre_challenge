
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

            people.map((v,i) => {
                console.log(v)
                let imgSrc = (v.picture !== undefined) ? v.picture : '/images/blank-profile-picture.png';
                let userProfile = `
                    <div class="profile-card">
                    <a href="/${v.publicId}">
                    <h2>${v.name}</h2>
                    <img src="${imgSrc}" alt="${v.name}'s Picture" width="123">
                    <p>${v.professionalHeadline}</p>
                    </a>
                    </div>
                `;

                return result.append(document.createRange().createContextualFragment(userProfile));
            }).join(' ');
        });
    }
}

function searchConnection(user) {
    let searchCon = document.querySelector('#conn');
    let result = document.querySelector('#connectionResult');


    if (searchCon.value.length >= 2) {
        getAjax(`/search/${user}/${searchCon.value}`, function(data) {
            let people = JSON.parse(data);
            result.innerHTML = null;
            people.map((v,i) => {
                
                let imgSrc = (v.person.picture !== undefined) ? v.person.picture : '/images/blank-profile-picture.png';
                let userProfile = `
                    <div class="profile-card">
                    <a href="/${v.person.publicId}">
                    <h2>${v.person.name}</h2>
                    <img src="${imgSrc}" alt="${v.person.name}'s Picture" width="123">
                    <p>${v.person.professionalHeadline}</p>
                    </a>
                    </div>
                `;

                return result.append(document.createRange().createContextualFragment(userProfile));
            }).join(' ');

        });
    }
}

(function(){
    // Get the modal
    var modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
})()
