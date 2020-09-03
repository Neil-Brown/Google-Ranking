document.querySelector("#getRank").addEventListener("submit", getRank)

function getRank(e){
	function validate(){
		if (!document.forms["getRank"]["key1"].value && !document.forms["getRank"]["key2"].value && !document.forms["getRank"]["key3"].value){
			alert("At least one keyword is required")
			return false
		} else if(!document.forms["getRank"]["site"].value){
			alert("Your site URL is required")
			return false
		}
		return true
	}
    e.preventDefault()
	if (!validate()){return}
	alert("Success")
}