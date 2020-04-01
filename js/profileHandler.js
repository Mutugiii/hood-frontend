$(document).ready(() => {
    getUserProfile();
})

let getUserProfile = () => {
    try {
        let username = localStorage.getItem('username');
        let access = JSON.parse(localStorage.getItem('access_token'));
        // fetch('https://hood-drf.herokuapp.com/api/v1/profile/' + username, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'Bearer' + access
        //     }
        // })
        axios.get('https://hood-drf.herokuapp.com/api/v1/profile/' + username, {
            params: {
                'Authorization': 'Bearer' + access
            }
        })
        .then((res) => res.json())
        console.log(res.json())
        .then((profile) => {
            let output = '';
            
            output += `
            <h3 class="text-center">Profile</h3>
            <div>
                <div class="text-center">
                    <img src="${profile.profile_picture}" id="avatar">
                    <br>
                    ${profile.name}
                    <br><br>
                    <div>
                        Location: <span style="font-weight: bolder;">${profile.location}$</span>
                        Hood: <span style="font-weight: bolder;">${profile.hood}</span>
                    </div>
                    <br>
                    <span style="font-weight: 900;">Bio:</span>
                    <div>
                        ${profile.bio}
                    </div>
                </div>
            </div>
            `
            document.getElementById('userprofile').innerHTML = output
        })
        .catch((err) => 
        {
            console.log(err)
            let output = '';
            
            output += `
            <div class="row">
            <div class="container">
                We could not find your profile! <br/>
                <button class='btn btn-outline-secondary'><a href="../profileTemplates/createProfile.html">Take me to create a profile</a></button>
            </div>
        </div>
            `
        document.getElementById('userprofile').innerHTML = output
        
        })
        
    } 
    catch(err) {
        let output = '';
            
        output += `
        <div class="row">
            <div class="container">
                An error occured login first & create a profile to access this page! <br/>
                <button class='btn btn-outline-secondary'><a href="../profileTemplates/createProfile.html">Take me to create a profile</a></button>
            </div>
        </div>
        `
        document.getElementById('userprofile').innerHTML = output
        setTimeout(() => {  window.location.href = '../profileTemplates/createProfile.html'; }, 5000);
    }
    finally {
    
    }
}


let refreshToken = () => {
    try {
        let access = localStorage.getItem('access_token');
        let refresh = localStorage.getItem('refresh_token');
        

        let token_send = 'Bearer' + refresh;

        if(access && refresh === null){
            window.location.href='../registrationTemplates/login.html';
        } else {
            fetch('https://hood-drf.herokuapp.com/api/v1/token/refresh/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: {
                body: JSON.stringify({refresh:token_send})
            }
            })
        }
    }
    catch(err) {
        console.log(err)
        window.location.href='../registrationTemplates/login.html';
    }
}