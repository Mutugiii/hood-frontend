$(document).ready(() => {
    getHoods()
})

let getHoods = () => {
    try{
        let access = JSON.parse(localStorage.getItem('access_token'));
        fetch('https://hood-drf.herokuapp.com/api/v1/hoods/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + access
            }
        })
        // axios.get('https://hood-drf.herokuapp.com/api/v1/hoods/', {
        //     params: {
        //         'Authorization': 'Bearer' + access
        //     }
        // })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let output = '<h2 class="text-center">Hoods</h2>';
            data.forEach((hood) => {
                if(hood.admin === null){
                    hood.admin = 'The Hood currently has no admin'
                }
                output += `
                <hr style="height:1px;border:none;color:rgb(145, 140, 140);background-color:#333;" />
                <div class="row">
                    <div class="col-md-6">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${hood.hood_name}</h5>
                                <small class="card-subtitle mb-2 text-muted">${hood.location}</small>
                                </br> </br>
                                <p class="card-text">
                                    Number of occupants: ${hood.occupants_count} </br>
                                    ${hood.admin}
                                </p>
                                <a href="../hoodTemplates/join.html" class="card-link">Join Hood</a>
                            </div>
                        </div>
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