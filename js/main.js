/* 

-- CRUDS system --

C ->make the user inter output and take value 
R -> retrive ' local storage '
U -XXX-> update the data from the table  and update iin local storage               
D -> remove from table and update iin local storage
S -XXX-> search about data                                                          


*/

// 1 - arry of obj from user


var siteNameInput = document.getElementById('site-name');
var siteUrlInput = document.getElementById('site-url');
var tableBody = document.getElementById('table-body');
var bookmarkRegex = /^\w{3,20}\s?(\w+)?$/i;
var urlRegex = /^(https?:\/\/)?([\w]+(\.[\w]+)+)(:\d+)?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/i;


var userSites = [];
userSites = JSON.parse(localStorage.getItem('userSites')) || []
displayData();





function addSite() {

    if (validationAll()) { 

        var sites = {
    
            siteName:siteNameInput.value,
            siteUrl:siteUrlInput.value,
        }
    
        userSites.push(sites);
        displayData()
        console.log(userSites);
    
        Swal.fire({
            icon: "success",
            title: "Your Data Was Added",
        });
        localStorage.setItem('userSites', JSON.stringify(userSites))
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter Valid Data",
        });
    }
    
}

// display data to user

function displayData() {

    var htmlMarkUp = '';

    for (var i = 0; i < userSites.length; i++){
        htmlMarkUp +=
        `
                            <tr>
                                <th scope="row" class="text-center">${i+1}</th>
                                <td class="text-center">${userSites[i].siteName}</td>
                                <td class="text-center">
                                    <button class="btn btn-success text-capitalize content-font fw-light">
                                    <a href="${userSites[i].siteUrl}" target="_blank" class="text-decoration-none text-white">
                                        <i class="fa-solid fa-eye"></i>
                                        viste
                                        </a>
                                    </button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-danger text-capitalize content-font fw-light" onclick="deleteSite(${i})">
                                        <i class="fa-solid fa-trash-can"></i>
                                        delete
                                    </button>
                                </td>
                            </tr>
        `
    }

    console.log(htmlMarkUp);
    tableBody.innerHTML = htmlMarkUp
    clearInputs();

}



function deleteSite(index) {
    // console.log(index);
    userSites.splice(index, 1);
    displayData();
    localStorage.setItem('userSites', JSON.stringify(userSites));
}



// clear

function clearInputs() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
    console.log('clear');
    
}
// validation on each input 


function inputValidation(regex, inputValue, alert, input) {
    if (regex.test(inputValue)) {
        alert.classList.add('d-none')
            input.classList.add('is-valid')
        input.classList.remove('is-invalid');
        return true;
    } else {
        alert.classList.remove('d-none')
            input.classList.add('is-invalid')
        input.classList.remove('is-valid');
        return false
    }
}


// check all inputs
function validationAll() {
    if (
        inputValidation(/^\w{3,20}\s?(\w+)?$/i, siteNameInput.value, nameAlert, siteNameInput)&&
        inputValidation(/^(https?:\/\/)?([\w]+(\.[\w]+)+)(:\d+)?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/i, siteUrlInput.value, urlAlert, siteUrlInput)
    ) {
        return true
    }
    return false
    
}