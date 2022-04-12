function hiliter(word, input) {
    var rgxp = new RegExp(word, 'gi');
    if (word.length<=3){
        var repl = '<span class="highlight">' + word + '</span>';
    }
    else{
        var capital = word.charAt(0).toUpperCase() + word.slice(1);
        var repl = '<span class="highlight">' + capital + '</span>';
    }
    input = input.replace(rgxp,repl)
    return input
}


function display_search_results(results){
    $("#searchresults").empty();
    if (results.length ==0){
        console.log("empty")
        $("#numresults").html(results.length + " matches found");
        let noresults = $("<div class = 'row'> no results found </div>");
        $("#searchresults").append(noresults);
    }
    else{
        $("#numresults").html(results.length + " matches found");
        console.log(results)
        if (titleres.length!=0){
            let newtitle = $("<div class = 'row searchtitle darkgrey'> Titles </div>")
            $("#searchresults").append(newtitle);
            $.each(titleres, function(index,value){
                let newresult = $("<div class = 'row'>");
                let highlight = hiliter(query,value.title);
                let link = $("<a href ='/view/"+ value.id + "'>"+highlight+"</a>");
                newresult.append(link)
                $("#searchresults").append(newresult);
            })
            $("#searchresults").append("<br>");
        }
        if (catres.length!=0){
            let newtitle2 = $("<div class = 'row searchtitle darkgrey'> Series </div>")
            $("#searchresults").append(newtitle2);
            $.each(catres, function(index,value){
                let newresult = $("<div class = 'row'>");
                let highlight = hiliter(query,value.category);
                let link = $("<a href ='/view/"+ value.id + "'>" + value.title + "</a><br>")
                let cat = $("<div class = listitem> category: "+highlight+"</div>")
                newresult.append(link)
                newresult.append(cat)
                $("#searchresults").append(newresult);
            })
            $("#searchresults").append("<br>");
        }
        if (charres.length!=0){
            let newtitle3 = $("<div class = 'row searchtitle darkgrey'> Characters </div>")
            $("#searchresults").append(newtitle3);
            $.each(charres, function(index,value){
                let newresult = $("<div class = 'row'>");
                let toString = value.main_characters.join();
                let highlight = hiliter(query,toString);
                let link = $("<a href ='/view/"+ value.id + "'>" + value.title + "</a><br>")
                let chars = $("<div class = listitem> main characters: " + highlight+"</div>")
                newresult.append(link)
                newresult.append(chars)
                $("#searchresults").append(newresult);
            })
            $("#searchresults").append("<br>");
        }
        if (droidres.length!=0){
            let newtitle4 = $("<div class = 'row searchtitle darkgrey'> Droids </div>")
            $("#searchresults").append(newtitle4);
            $.each(droidres, function(index,value){
                let newresult = $("<div class = 'row'>");
                let toString = value.droids.join();
                let highlight = hiliter(query,toString);
                let link = $("<a href ='/view/"+ value.id + "'>" + value.title + "</a><br>")
                let droids = $("<div class = listitem> droids: " + highlight +"</div>")
                newresult.append(link)
                newresult.append(droids)
                $("#searchresults").append(newresult);
            })
            $("#searchresults").append("<br>");
        }
        if (sumres.length!=0){
            let newtitle5 = $("<div class = 'row searchtitle darkgrey'> Summary </div>")
            $("#searchresults").append(newtitle5);
            $.each(sumres, function(index,value){
                let newresult = $("<div class = 'row'>");
                let highlight = hiliter(query,value.summary);
                let link = $("<a href ='/view/"+ value.id + "'>" + value.title + "</a><br>")
                let sum = $("<div class = listitem> summary: " + highlight+"</div>")
                newresult.append(link)
                newresult.append(sum)
                $("#searchresults").append(newresult);
            })
            $("#searchresults").append("<br>");
        } 
    }
};

$(document).ready(function(){  
    display_search_results(results);
})
