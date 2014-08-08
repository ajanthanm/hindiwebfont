var viewmode = 1;
function loadFont(){
	$.ajax ({
		url:"https://spreadsheets.google.com/feeds/cells/1qSk_BXLMSIOJqfUE7s-x5CbQwdy3v3eCqL4ywZPB69I/3/public/basic?alt=json-in-script",
		type: "GET",
		dataType:"xml",
		success: function(data)
		{
			console.log(data['$t'])
		},
		error: function (err)
		{
			var r = String(err.responseText);
			r = r.substr(0, r.length-2); 
			r = r.substr(28);
			r = JSON.parse(r);
			r = r.feed.entry;
			var j=0;
			var fname = "";
			var fcss = "";
			codename = "";
			for(var i=4; i< r.length; i++)
			{
				j++;
				if(j==1)
				{
					fname = r[i].content.$t;
					
				}
				if(j==2)
				{
					codename = r[i].content.$t;
				}
				if(j==3)
				{
					document.getElementsByTagName("head")[0].innerHTML += r[i].content.$t;
				}
				if(j==4)
				{
					fcss = r[i].content.$t;
					document.getElementsByTagName("style")[0].innerHTML += "."+codename+"{"+fcss+"}";
					if(i==7)
					{
						$(".navul").append('<li onclick="fontChange(\''+codename+'\', this);" class="active">'+fname+'</li>');	
						$(".section").addClass(codename);
						$(".heading").children("span").text(fname);
					}
					else{
						$(".navul").append('<li onclick="fontChange(\''+codename+'\', this);">'+fname+'</li>');
					}
					$("#entry_1700713492").append("<option value='"+fname+"'>"+fname+"</option>");
					j=0;
				}

			}
			$("#nav").prepend('<li class="navtwo"><a class="one active"></a><a class ="two" href="compare.html"></a></li>');
		}
	});
}

function viewChange(viewtype, ele)
{
	$(".one").removeClass("active");
	$(".two").removeClass("active");
	$(ele).addClass("active");
	/*if(viewtype == 1 && viewmode != 1) 
	{
		$(".navul2").remove();
		$(".navul").removeClass("nav2view");
		viewmode=1;
	}
	else if(viewtype ==2 && viewmode !=2 ) {
		console.log("2");
		$(".navul").clone().appendTo("#nav");
		$(".navul:nth-child(3)").addClass("navul2");
		$(".navul").addClass("nav2view");
		$(".navul2").children(".navtwo").remove();
		viewmode =2;
	}*/

}
function fontChange(clname, ele)
{
	$("li").removeClass("active");
	ele.className = "active";
	var fname = $(ele).html();
	$("#entry_1700713492").val(fname);
	$(".heading").children("span").html(fname);
	var el= document.getElementsByClassName("section");
	for (var i = el.length - 1; i > 1; i--) {
		el[i].className = clname+ " section";
	};
}
$(window).bind("load", function() {
   pageLoad(); 
   nah();
   offset = $(".nav").offset();
});
$("#reportbox").bind('contextmenu', function(e) {
    return false;
}); 