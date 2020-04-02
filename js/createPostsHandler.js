$(document).ready(() => {
    createPosts()
})

let createPosts = () => {
    try{
        let access = JSON.parse(localStorage.getItem('access_token'));
        let user_name = localStorage.getItem('username');
        let hood_name = localStorage.getItem('hood_name');

        let post_title = document.getElementById('username').value;
        let post_content = document.getElementById('password').value;
        let post_image = document.getElementById('password').src;
        let message = document.getElementById('messagesinfo');
        // fetch(`https://hood-drf.herokuapp.com/api/v1/hoods/${hood_name}`, {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'Bearer' + access
        //     },
        //     credentials: 'include'
        // })
        axios.post(`https://hood-drf.herokuapp.com/api/v1/hoods/${hood_name}`, {
            params: {
                'Authorization': `Bearer ${access}`
            },
            post_title:post_title,
            post_content:post_content,
            post_image:post_image
            
        })
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2 class="text-center">Hoods</h2>';
            data.forEach((hood) => {
                userhood = hood.hood_name
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
                                <a href="join.html" class="card-link">Join Hood</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });

            document.getElementById('hoodslist').innerHTML = output;
            localStorage.setItem('hood_name', userhood)
        })
        .catch((err) => 
        {
            // window.location.href = '../registrationTemplates/login.html';
            console.log(err)
        })
    }
    catch(err){
        // window.location.href = '../hoodTemplates/join.html'
        console.log(err)
    }
}