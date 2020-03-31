$(document).ready(function(){
    getHoods()
})

function getHoods(){
    fetch('https://hood-drf.herokuapp.com/api/v1/hoods/')
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
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
            `
        })

        document.getElementById('hoodslist').innerHTML = output
    })
    .catch((err) => console.log(err))
}