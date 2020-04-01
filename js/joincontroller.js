$(document).ready(() => {
    joinHoods()
})

let joinHoods = () => {
    try{
        let user_name = localStorage.getItem('username')
        let hood_name = localStorage.getItem('hood_name')

        axios.get('https://hood-drf.herokuapp.com/api/v1/join/' + hood_name + user_name)
        .then((res) => console.log(res.json()))
        .catch((err) => {
            console.log(err)
            
        })
    }
    catch(err){
        console.log(err)
        
    }
}