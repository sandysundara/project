function searchListener (oControl){
	var sValue;
	sValue = oControl.value;
	oAppUtils.ConnectivityManager.doGet("https://graph.facebook.com/search","access_token="+oAppUtils.ConnectivityManager.accessToken+"&q="+sValue+"&type=page&fields=about,category,name,likes,cover,bio,birthday",function(response){
		
		try {
			var obj = JSON.parse(response);

			renderList(obj.data);
			
		}catch(e){
		}
		
	});
	
}

function HandleClickOfClose(){
	document.getElementById("modal").style.visibility="hidden";
}

function handlePressOfFavIcon(oImg){
	

	var oParent = oImg.parentElement;
	var sId 	= oParent.getAttribute("sid");
	var state   = oImg.getAttribute("state");
	if(state==0){
		oAppUtils.FavObject[sId]=1;
		oImg.src ="resources/star.png";
		oImg.setAttribute("state",1);
		window.localStorage.setItem("FavObject",JSON.stringify(oAppUtils.FavObject));
	}else {
		delete oAppUtils.FavObject[sId];
		oImg.src ="resources/EmptyStar.png";
		oImg.setAttribute("state",0);
		window.localStorage.setItem("FavObject",JSON.stringify(oAppUtils.FavObject));
	}
	
	
}

function HandleClickOfListItem(oControl){
	
		var sId =oControl.getAttribute("sid")
		var oData ="";
		var sHTML ="";
		document.getElementById("modal").style.visibility="visible";
		oAppUtils.ConnectivityManager.doGet("https://graph.facebook.com//v2.1/"+sId+"/picture","redirect=false&access_token="+oAppUtils.ConnectivityManager.accessToken,function(response){
			var oData = JSON.parse(response);
			sHTML="<img class=\"modalImage\" src = "+oData.data.url+ "></img><img class=\"modalClose\" src = \"resources/bc.png\"  onclick=\"HandleClickOfClose()\"></img>"
			sHTML=sHTML+"<br>";
			
			sHTML=sHTML+"<label><b>Name:</b></label>     <label>"+oAppUtils.PageModel[sId].name+"</label><br>";
			sHTML=sHTML+"<label><b>Category:</b></label>     <label>"+oAppUtils.PageModel[sId].category+"</label><br>";
			sHTML=sHTML+"<label><b>About:</b></label>     <label>"+oAppUtils.PageModel[sId].about+"</label><br>";
			sHTML=sHTML+"<label><b>Number of Likes:</b></label>     <label>"+oAppUtils.PageModel[sId].likes+"</label><br>";
	
			
			
			
			if(oAppUtils.PageModel[sId].cover && oAppUtils.PageModel[sId].cover.source){
				sHTML=sHTML+"<img class =\"modalcover\"src = "+oAppUtils.PageModel[sId].cover.source+"></img>"
			}
			document.getElementById("modal").innerHTML= sHTML;

			
		});

		

	
}

function renderList(oData){
	console.log(oData);
	var HTML = "<ul>";
	var imgSrc="";
	var state = 0; 
	oAppUtils.PageModel = {};
	
	
	for(var i=0;i<oData.length;i++){
	   oAppUtils.PageModel[oData[i].id]=oData[i];
	   if(oAppUtils.FavObject[oData[i].id]){
			
		imgSrc="resources/star.png";
		state=1;
	}else{
		imgSrc="resources/EmptyStar.png";
		state=0;
	}
		HTML =HTML+"<li onclick=\"HandleClickOfListItem(this)\" sId="+oData[i].id+" \"><a href=\"#\">"+oData[i].name+"</a><br>"+oData[i].category+"<br>"+oData[i].about+"<img state="+state+" src="+imgSrc+" onClick=\"handlePressOfFavIcon(this)\"></img></li>"
		
	}	
	HTML = HTML+"<ul>";
	document.getElementById("PageListDiv").innerHTML=HTML;
	document.getElementById("search").style.visibility="visible"
	
}
