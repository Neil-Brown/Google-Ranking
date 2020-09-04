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
	for(let b of document.querySelectorAll(".badge")){
		b.style.display = "none"
	}
	const site = document.querySelector("#site").value
	let keys = document.querySelectorAll("input.key")
	for(const key of keys){
		if(!key.value){continue}
		let parentId = key.parentElement.parentElement.id
		document.querySelector(`#${parentId} .spinner-grow`).style.display = "inline-block"
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "/getRank");
		let formData = new FormData();
		formData.append("site", site)
		formData.append("key", key.value)
		xhr.send(formData);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
						let response = JSON.parse(xhr.response)
						document.querySelector(`#${parentId} .spinner-grow`).style.display = "none"
						let badge = document.querySelector(`#${parentId} .badge`)
						badge.style.display = "inline-block"
						badge.textContent = response.pos
						badge.title = response.link
						badge.addEventListener("click", function(){
							alert(badge.title)
						})
        }
    }
	}
}
