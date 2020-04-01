$(document).ready(() => {
    getServices()
    getBussinesses()
    getPosts()
})

let getServices = () => {
    fetch('https://hood-drf.herokuapp.com/api/v1/services/')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h5>Emergency Services</h5>';
        data.forEach((service) => {
            output += `
            <hr style="height:1px;border:none;color:rgb(145, 140, 140);background-color:#333;width: 630px;" />
            <div class="row">
                <div class="col-md-5">
                    <div style="text-decoration: underline;">${service.name}</div>
                    Contact Information:
                    <div class="text-center">
                        Phone: ${service.contact_number}
                        Email: ${service.email}
                    </div>
                    Description
                    <p>${service.description}</p>
                    Department Id: <span>${service.department}</span>
                </div>
            </div>
            `
        })
        document.getElementById('serviceslist').innerHTML = output
    })
    .catch((err) => console.log(err))
}

let getBussinesses = () => {
    fetch('https://hood-drf.herokuapp.com/api/v1/bussinesses/')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h5>Bussinesses</h5>';
        data.forEach((bussiness) => {
            output += `
            <hr style="height:1px;border:none;color:rgb(145, 140, 140);background-color:#333;width: 630px;" />
            <div class="row">
                <div class="col-md-5">
                    <div style="text-decoration: underline;">${bussiness.name}</div>
                     Contact Information: ${bussiness.email}
                     Description
                    <p>${bussiness.description}</p>
                </div>
            </div>
            `
        })

        document.getElementById('bussinesseslist').innerHTML = output
    })
    .catch((err) => console.log(err))
}

let getPosts = () => {
    fetch('https://hood-drf.herokuapp.com/api/v1/posts/')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h5>Posts by Users</h5>';
        data.forEach((post) => {
            output += `
            <div class="card">
                <div class="card-header">${post.post_title}</div>
                <img class="card-img-top" src="${post.post_image}" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">${post.post_content}</p>
                    <div class="card-footer text-muted">
                    Post by ${post.user.username} on ${post.pub_date}
                    </div>
                </div>
            </div>
            `
        })

        document.getElementById('postslist').innerHTML = output
    })
    .catch((err) => console.log(err))
}