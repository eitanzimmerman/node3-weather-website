
const weathrForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

weathrForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchElement.value;
    messageOne.textContent = '';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather/?adress=${encodeURIComponent(location)}`).then((response)=>{
    response.json().then(data=>{
        if(data.error){
            messageOne.textContent = data,error;
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
    }).catch(err=>console.log(err))
    
})
})