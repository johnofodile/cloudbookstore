const main3=document.querySelector("#main");
let ploginStatus=document.querySelector(".ploginStatus");




 


function loginFunction(){

    main3.innerHTML= `
    <div class="loginForm">
      <form name="login">
    <h1>Login</h1>
    <label>
      <span>Email:</span><input required type="email" name="email" class="form-control" >
    </label>
     <label>
      <span>Password:</span><input required type="password" name="password" class="form-control" >
    </label>
    <input type="submit" class="btn btn-dark" value="Log in">
  </form>
  </div>
  `
};
loginFunction();



document.querySelector('body').addEventListener('submit', async (event) => {

    let target = event.target;
  
   
    if (!target.closest('form[name="login"]')) { return; }
  
    event.preventDefault();
  
    let formElements = document.forms.login.elements;
    let requestBody = {};
    for (let element of formElements) {
      if (element.type === 'submit') { continue; }
      requestBody[element.name] = element.value;
    }
  
    let result;
    try {
      result = await (await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
        
      })).json();
      console.log(body);
    }
    catch (ignore) { }
  
    if (!result || result._error) {
     alert("something went wrong");
      return;
    }
  
    location.reload();
  
  });
  async function checkLoginStatus(){
    let loggedIn;
    try {
      loggedIn = await (await fetch('/api/login')).json();
    }
    catch (ignore) {

     }
     if (!loggedIn || loggedIn._error) {
        ploginStatus.innerText = "you are not logged in yet"
       
      }
    else{
      
   
      ploginStatus.innerHTML = `
          Logged in as ${loggedIn.firstName} ${loggedIn.lastName}
          email:  ${loggedIn.email}
          <a href="/logout">Logout</a>
      `;
    }
  
  }
  
checkLoginStatus();

  document.querySelector('body').addEventListener('click', async (event) => {

    if (!event.target.closest('a[href="/logout"]')) { return; }
  
    event.preventDefault();
  
    let result;
    try {
      result = await (await fetch('/api/login', { method: 'DELETE' })).json();
    }
    catch (ignore) { }
  
    location.reload();
  
  });
  
     
    
   
    
          
