function donateBlood(){
    let message = "Add Blood Sample to Bank?";
    if(confirm(message) == true){
        callAPI(document.getElementById('donor').value, document.getElementById('bgroup').value, document.getElementById('quantity').value);
    }
}
var callAPI = (donorName, bloodGroup, quantity) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ 
        "donorName": donorName, 
        "bloodGroup": bloodGroup, 
        "quantity": quantity 
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://yct3pczbha.execute-api.ap-south-1.amazonaws.com/prod", requestOptions)
        .then(response => response.text())
        .then(result => alert("Sample added successfully"))
        .catch(error => console.log('error', error));
}