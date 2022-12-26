

let entrieToUpdate ={}
$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});

function SetForm(message,e) {
	entrieToUpdate = JSON.parse(message);
	const form = document.getElementById('editEmployeeModal')
  const inputName = document.getElementById('nameInput')
  inputName.setAttribute('value',entrieToUpdate.name)
  const inputEmail = document.getElementById('emailInput')
  inputEmail.setAttribute('value',entrieToUpdate.email)
  const inputAddress = document.getElementById('addressInput')
  inputAddress.innerText =entrieToUpdate.address;
  const inputPhone = document.getElementById('phoneInput')
  inputPhone.setAttribute('value',entrieToUpdate.phone)
  const inputId = document.getElementById('idInput')
  inputId.setAttribute('value',entrieToUpdate._id)
  



form.addEventListener('submit',(e)=>{

	e.preventDefault();

	const data ={
		_id:inputId.value,
		name:inputName.value,
		email:inputEmail.value,
		address:inputAddress.value,
		phone:inputPhone.value,
	}
  
	fetch('/edit', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	}).then((response) => {
		
	  return response.json();
	}).then((data) => {
		console.log(data)
	 window.location.reload();
	}).catch((error) => {
	  console.log('Hello ',error);
	});

})
  }


