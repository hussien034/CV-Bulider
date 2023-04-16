let fName = document.getElementById("firstName");
let lName = document.getElementById("lastName");
let role = document.getElementById("role");
let phone = document.getElementById("phone");
let LinkedIn = document.getElementById("LinkedIn");
let email = document.getElementById("email");
let GitHub = document.getElementById("GitHub");
let Summary=document.getElementById("Summary");
let education=document.getElementById("education");
let university=document.getElementById("university");
let GPA=document.getElementById("GPA");
let projects=document.getElementById("projects");
let alertDanger=document.getElementById("alert");
let volunteering=document.getElementById("volunteering");
let Certifications=document.getElementById("Certifications");
let Information=document.getElementById("Information");
let printFName = document.getElementById("printFName");
let printLname = document.getElementById("printLname");
let printRole = document.getElementById("printRole");
let printLinkedIn = document.getElementById("printLinkedIn");
let linkLinkedIn = document.querySelector(".linkLinkedIn");
let githubLink = document.querySelector(".githubLink");
let printEmail = document.getElementById("printEmail");
let printPhone = document.getElementById("printPhone");
let printGithub = document.getElementById("printGithub");
let printSummary=document.getElementById("printSummary");
let printEducation=document.getElementById("printEducation");
let printUniversity=document.getElementById("printUniversity");
let printGPA=document.getElementById("printGPA");
let printProjects=document.getElementById("printProjects");
let printVolunteering=document.getElementById("printVolunteering");
let printCertifications=document.getElementById("printCertifications");
let printInformation=document.getElementById("printInformation");
let sendLinkedIn = document.getElementById("sendLinkedIn");
let sendGitHub = document.getElementById("sendGitHub");
var invoiceP=document.getElementById("invoice");
//Validation ......................................................
var nameRex = /^[A-Za-z]{1,9}$/;
var emailVal =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var emailGithubVal=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
var linkedInVal =/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/;
var summaryVal=/[.*+?^${}()|[\]\\]/g;
var GPAVal=/^[0-4]+([.][0-9]+)?$/;
var alertFName = document.querySelector(".alertFName");
var alertLName = document.querySelector(".alertLName");
var alertEamil = document.querySelector(".alertEamil");
var alertLinkedIn=document.querySelector(".alertLinkedIn");
var alertGitub=document.querySelector(".alertGitub");
// Valiaite Inputs...............................
fName.onkeyup = function () {
  if (nameRex.test(fName.value)) {
    alertFName.style.display = "none";
    fName.classList.add("is-valid");
    fName.classList.remove("is-invalid")
  } else {
    alertFName.style.display = "block";
    fName.classList.add("is-invalid");
    fName.classList.remove("is-valid");
    fName.value = "";
  }
};
lName.onkeyup = function () {
  if (nameRex.test(lName.value)) {
    alertLName.style.display = "none";
    lName.classList.add("is-valid");
    lName.classList.remove("is-invaild")
  } else {
    alertLName.style.display = "block";
    lName.classList.add("is-invalid");
    lName.classList.remove("is-valid");
    lName.value = "";
  }
};
role.onkeyup=function(){
     role.classList.add("is-valid")
}
phone.onkeyup=function(){
     phone.classList.add("is-valid")
}
email.onkeyup = function () {
     if (emailVal.test(email.value)) {
       alertEamil.style.display = "none";
       email.classList.add("is-valid")
     }
else {
         alertEamil.style.display = "block";
         email.classList.add("is-invalid")
       
     }
};
LinkedIn.onkeyup=function(){
     if(linkedInVal.test(LinkedIn.value))
     {
          alertLinkedIn.style.display = "none";
          LinkedIn.classList.add("is-valid")
     }
else {
          alertLinkedIn.style.display = "block";
          LinkedIn.classList.add("is-invalid")
        
      }
};
GitHub.onkeyup=function(){
     if(emailGithubVal.test(GitHub.value))
     {
          GitHub.classList.add("is-valid")
          alertGitub.style.display = "none";
     }
else {
          alertGitub.style.display = "block";
          GitHub.classList.add("is-invalid")        
      }
};
Summary.onkeyup=function(e){
     if(e.key=="Enter"){
     Summary.value=Summary.value+"<br>";
     }
     if(Summary.value==""){
          Summary.classList.add("is-invalid");
          Summary.classList.remove("is-valid");
     }
     else{
            Summary.classList.add("is-valid");
            Summary.classList.remove("is-invalid");
     }
};
university.onkeyup=function(){
     if(university.value==""){
          university.classList.add("is-invalid");
          university.classList.remove("is-valid");
     }
     else{
          university.classList.add("is-valid");
          university.classList.remove("is-invalid");
     }
}
education.onkeyup=function(){
     if(education.value==""){
          education.classList.add("is-invalid");
          education.classList.remove("is-valid");
     }
     else{
          education.classList.add("is-valid");
          education.classList.remove("is-invalid");
     }
};
GPA.onkeyup=function(){
     if(GPAVal.test(GPA.value)){
          GPA.classList.remove("is-invalid");
          GPA.classList.add("is-valid");
     }
     else{
          GPA.classList.remove("is-valid");
          GPA.classList.add("is-invalid");
     }
};
projects.onkeyup=function(e){
     if(e.key=="Enter"){
          projects.value=projects.value+"<br>";
     }
     if(projects.value==""){
          projects.classList.add("is-invalid");
          projects.classList.remove("is-valid");
     }
     else{
          projects.classList.add("is-valid");
          projects.classList.remove("is-invalid");
     }
};
volunteering.onkeyup=function(){
     if(volunteering.value==""){
          volunteering.classList.add("is-invalid");
          volunteering.classList.remove("is-valid");
     }
     else{
          volunteering.classList.add("is-valid");
          volunteering.classList.remove("is-invalid");
     }
};
Certifications.onkeyup=function(e){
     if(e.key=="Enter"){
          Certifications.value=Certifications.value+"<br>";
     }
     if(Certifications.value==""){
          Certifications.classList.add("is-invalid");
          Certifications.classList.remove("is-valid");
     }
     else{
          Certifications.classList.add("is-valid");
          Certifications.classList.remove("is-invalid");
     }
};
Information.onkeyup=function(e){
     if(e.key=="Enter"){
          Information.value=Information.value+"<br>";
     }
     if(Information.value==""){
          Information.classList.add("is-invalid");
          Information.classList.remove("is-valid");
     }
     else{
          Information.classList.add("is-valid");
          Information.classList.remove("is-invalid");
     }
}
//----------------------------------------------------------------
fName.addEventListener("keyup", () => {
  printFName.innerHTML = fName.value;
});
lName.addEventListener("keyup", () => {
  printLname.innerHTML = lName.value;
});
role.addEventListener("keyup", () => {
  printRole.innerHTML = role.value;
});
email.addEventListener("keyup", () => {
  printEmail.innerHTML = "E: " + email.value;
});
phone.addEventListener("keyup", () => {
  printPhone.innerHTML = "| " + "T :+20 " + phone.value;
});
LinkedIn.addEventListener("keyup", () => {
  linkLinkedIn.innerHTML = "LinkedIn"+" ";
  printLinkedIn = LinkedIn.value;
});
GitHub.addEventListener("keyup", () => {
  githubLink.innerHTML = " | GitHub";
  printGithub = GitHub.value;
});
Summary.addEventListener("keyup",()=>{
   
          printSummary.innerHTML=  Summary.value;
   
   
});
education.addEventListener("keyup",()=>{
     printEducation.innerHTML=education.value;
});
university.addEventListener("keyup",()=>{
     printUniversity.innerHTML=university.value
});
GPA.addEventListener("keyup",()=>{
     printGPA.innerHTML= GPA.value + "GPA"
});
projects,addEventListener("keyup",()=>{
       printProjects.innerHTML=projects.value
})
volunteering.addEventListener("keyup",()=>{
     printVolunteering.innerHTML=volunteering.value
});
Certifications.addEventListener("keyup",()=>{
     printCertifications.innerHTML=Certifications.value
});
Information.addEventListener("keyup",()=>{
     printInformation.innerHTML=Information.value
})
function getLinkedInd() {
  sendLinkedIn.innerHTML = `<a href="${printLinkedIn}" target="_blank">LinkedIn</a>`;
}
function getGitHub() {
  sendGitHub.innerHTML = `<a href="${printGithub}" target="_blank"> | GitHub</a>`;
}
function printDiv() {
     var divContents = invoiceP.innerHTML;
     var a = window.open();
     a.document.write('</body></html>');
     a.document.write(divContents);
     a.document.close();
     a.print();
};

//jQuery..............................
function hideSecond(){
     $(".secondHead").hide()
};