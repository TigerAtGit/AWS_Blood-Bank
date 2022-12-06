window.onload = function () {
    callAPI();
    var x = document.getElementById("updateblood")
    x.style.display = 'none';
};
var selected_id;

var callAPI = () => {

    fetch("https://yct3pczbha.execute-api.ap-south-1.amazonaws.com/prod").then(function (response) {
        return response.json();
    }).then(function (data) {
        var slides = data["body"]

        var str = ''
        slides.forEach(function (slide) {
            S_Id = slide['Sample_Id']["S"];
            str += '<div class="col-md-4">';
            str += '<div class="card mb-3">';
            str += `<div class="card-body" id=${S_Id}>`
            str += '<h5 class="card-title">' + S_Id + '</h5>';
            str += '<h4 class="card-title">' + slide['Blood_Group']["S"] + '</h4>';
            str += '<p class="card-text"><b>Donor:</b> ' + slide['Donor_Name']["S"] + '</p>';
            str += '<p class="card-text"><b>Quantity:</b> ' + slide['Quantity']["S"] + ' mL</p>';
            str += '<p class="card-text"><b>Donated on:</b> ' + slide['Donated_On']["S"] + '</p>';
            str += `<button class="btn btn-danger" onclick="deleteBloodSample(this)">Delete</button>`;
            str += `<button class="btn btn-success ms-2" onclick="updateBloodSample(this)">Update</button>`;
            str += '</div> </div> </div>';
        });

        document.getElementById("card").innerHTML = str;


    }).catch(function () {
        console.log("Error while fetching data");
    });
}


function deleteBloodSample(elem) {
    var S_id = elem.parentNode.id;
    console.log(S_id);
    url = "https://yct3pczbha.execute-api.ap-south-1.amazonaws.com/prod?Sample_Id=" + S_id;
    if (confirm("Please confirm to delete this sample") == true) {
        fetch(url, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => location.reload());
    }
}


function updateBloodSample(elem) {
    toggle();
    this.selected_id = elem.parentNode.id;
    document.getElementById("sid").innerHTML = "<b>Sample Id:</b> " + selected_id;
}


function toggle() {
    var x = document.getElementById("updateblood")
    if (x.style.display == 'block') {
        x.style.display = 'none';
    }
    else {
        x.style.display = 'block';
    }
}


function closePopUp() {
    toggle();
}


function submitUpdate() {
    var sid = String(this.selected_id)
    var donor = document.getElementById("donor").value
    var blood_group = document.getElementById("blood_group").value
    var quantity = document.getElementById("quantity").value
    console.log(sid, donor, blood_group, quantity)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "sample_id": sid,
        "donor_name": donor,
        "blood_group": blood_group,
        "quantity": quantity
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://yct3pczbha.execute-api.ap-south-1.amazonaws.com/prod/", requestOptions)
        .then(response => response.text())
        .then(result => location.reload())
        .catch(error => alert(error));

}