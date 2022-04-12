function display_all(all){
    $("all").empty();
    $.each(all, function(index,value){
        let newthing = $("<div class = 'col-lg-3 lesspad'>");
        let content = $("<a href ='/view/"+ value.id + "'>" + "<img class = 'img-responsive fullwidth fullheight' src='"
        +value.image+ "'" + "alt= '"+value.title+"'></a>")
        newthing.append(content)
        $("#all").append(newthing);
    })
}

$(document).ready(function(){
    display_all(all)   
})