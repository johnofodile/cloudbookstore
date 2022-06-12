

const main=document.querySelector("#main");
const form=document.querySelector("#form");
const search=document.querySelector("#search");
let mainTitle=document.querySelector(".mainTitle");
let date;
let time;
let title;
let price;
let theatre;
let email;
let sitstatus;
let counter;


async function loadAllBooks(route){
    let rawData=await fetch(route);
    let products=await rawData.json();
    console.log(products);


    
    main.innerHTML="";
      for(let product of products){
         
      
        const book=document.createElement("div");
        
        book.classList.add("book");
        t=product.title;
       
        book.innerHTML=`
        <button type="button" onclick="myFunction(event)" class="btn btn-success buttonImage">${product.title}</button>
                <img src="/images/defaultimage.jpg" alt="${product.title}" class="bookImage">

        
        
        <div class="bookDescription" ">
        <h3 class="bookh3">${product.title}</h3>
        <span >${product.pages}</span>
        </div>
        <div class="description">
            <h3>Overview</h3>
           ${product.description};
        </div>
        `
        main.appendChild(book);
        
    }


}
    
    loadAllBooks("/api/books");
    
    
    
    