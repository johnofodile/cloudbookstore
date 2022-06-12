const mainDiv=document.querySelector("#main");



function getSignupPage(){

mainDiv.innerHTML=
 `
 <div class="registrationDiv">
 <h1 class="registerTitle">Register Account</h1>
<form name="registration">
  <label>
    <span>First name:</span><input required minlength="2" name="firstName" autocomplete="on" type="text">
  </label>
  <label>
    <span>Last name:</span><input required minlength="2" name="lastName" autocomplete="on" type="text">
  </label>
  <label>
    <span>Email:</span><input required name="email" type="email" autocomplete="on">
  </label>
  <label>
    <span>Password:</span><input required minlength="8" name="password" type="password" >
  </label>
  <label>
    <span>Repeat password:</span><input required minlength="8"  name="passwordRepeated" type="password" autocomplete="on">
  </label>
  <input type="submit" value="Register">
</form>
</div>
`
;
}
getSignupPage();


document.querySelector('body').addEventListener('submit', async (event) => {

  let target = event.target;

  
  if (!target.closest('form[name="registration"]')) { return; }

  
  event.preventDefault();

  let formElements = document.forms.registration.elements;
  let requestBody = {};
  for (let element of formElements) {
    console.log(element.name,element.value);
    if (element.type === 'submit') { continue; }
    requestBody[element.name] = element.value;
  }
 
    

  if (requestBody.password !== requestBody.passwordRepeated) {
    alert('The passwords doesn\'t match!\nPlease fill in the same password twice!');
    return;
  }

  delete requestBody.passwordRepeated;

  
  let result = {};
  try {
    result = await (await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })).json();
  }
  catch (ignore) { 

  }

  
  
  
  if (!result.changes) {
    document.querySelector('.register').innerHTML = `
      <h3>Something went wrong!</h3>
      <p>We could not register you right now because of a technical problem.</p>
      <p>Please try again later!</p>
    `;
    return;
  }


  mainDiv.innerHTML = `
  <div class="memberDiv">
    <h3>You are now a new member!</h3>
    <p>Your information is now saved in our database.You can now go to the login terminal and officially login</p>
    </div>
  `;
});



  




