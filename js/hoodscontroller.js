$(document).ready(() => {
    getHoods()
})

let getHoods = () => {
    try{
        let access = JSON.parse(localStorage.getItem('access_token'));
        // let authurl = JSON.stringify(access);
        console.log(access)
        fetch('https://hood-drf.herokuapp.com/api/v1/hoods/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + access
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let output = '<h2>Hoods</h2>';
            data.forEach((hood) => {
                output += `
                <hr style="height:1px;border:none;color:rgb(145, 140, 140);background-color:#333;width: 630px;" />
                <div class="row">
                    <div class="col-md-5">
                        <div style="text-decoration: underline;">${hood.hood_name}</div>
                        Hood Location: <span class="text-center">${hood.location}</span>
                        Occupants: <span>${hood.occupants_count}</span>
                        <div class="text-muted>${hood.admin.username}</div>
                    </div>
                </div>
                `;
            });

            document.getElementById('hoodslist').innerHTML = output;
        })
        .catch((err) => 
        {
            console.log(err)
            let output = '';
            output += `
                <div class="row" style='text-align: center'>
                    <hr style="height:1px;border:none;color:rgb(145, 140, 140);background-color:#333;" />
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <p>Only Administrators are allowed to access the contents of this page</p>
                    </div>
                    <div class="col-md-3"></div>
                    <hr style="height:1px;border:none;color:rgb(145, 140, 140);background-color:#333;" />
                </div>
                `;
            document.getElementById('hoodslist').innerHTML = output;
            setTimeout(() => {  window.location.href = '../index.html'; }, 3000);
        })
    }
    catch(err){
        console.log(err)
        window.location.href = '../registrationTemplates/login.html'
    }
}