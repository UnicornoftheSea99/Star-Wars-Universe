function edit_entry(){
    let title = $("#title").val();
    let release_year = $("#release_year").val();
    let era = $("#era").val();
    let series = $("#radio_series input[type='radio']:checked").val();
    let mains_arr = []
    $.each($("#chars option:selected"), function(){            
        mains_arr.push($(this).val());
    });
    let other = $("#other").val();
    if (other.length!=0){
        mains_arr.push(other)
    }
    let mains = mains_arr.join()
    let droids_arr = []
    $.each($("#droids option:selected"), function(){            
        droids_arr.push($(this).val());
    });
    let other2 = $("#other2").val();
    if (other2.length!=0){
        droids_arr.push(other2)
    }
    let droids = droids_arr.join()
    let summary = $("#summary").val();
    let imgurl = $("#image_url").val();
    let data_to_save = {
        "title": title,
        "release_year": release_year,
        "era": era,
        "category": series,
        "main_characters": mains,
        "droids": droids,
        "summary": summary,
        "image": imgurl
    }
    console.log(data_to_save)
    $.ajax({
        type: "POST",
        url: "edit_data/"+movie.id,                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            let all_data = result["data"] 
            data = all_data
            let url2 = "/view/" + movie.id
            console.log(url2)   
            location.href = url2
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
};

$(document).ready(function(){
    $('#radio_series input[type="radio"]').each(function( index ) {
        if ($(this).val() == movie.category){
            $(this).attr("checked","checked")
        }
      });
    $( function() {
        $( "#dialog" ).dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Yes, Discard Changes": function() {
                $( this ).dialog( "close" );
                var url = "/view/" + movie.id
                console.log(url)   
                location.href = url
                },
                Cancel: function() {
                $( this ).dialog( "close" );
                }
            }
        });
        $("#discardbutton").click(function(){ 
            $( "#dialog" ).dialog( "open" );
        });
    });
    $( "#editbutton").click(function() {
        edit_entry()
    });

    $("#editbutton").keypress(function(e){     
        if(e.which == 13) {
            edit_entry()
        }   
    })
})



    

