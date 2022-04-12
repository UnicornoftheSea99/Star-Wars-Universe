function showDiv(divId, element){
    document.getElementById(divId).style.display = element.value == "Other" ? 'block' : 'none';
}

function add_entry(new_entry){
    let title = $("#title").val();
    let release_year = $("#release_year").val();
    let era = $("#era").val();
    let series = $("#radio_series input[type='radio']:checked").val();
    let mains_arr = []
    let other = $("#other").val();
    $.each($("#chars option:selected"), function(){      
        if ($(this).val() == "Other" && other.length!=0){
            mains_arr.push(other)
        }      
        else{
            mains_arr.push($(this).val());
        }
    });
    
    let mains = mains_arr.join()
    let droids_arr = []
    $.each($("#droids option:selected"), function(){   
        if ($(this).val() == "Other" && other.length!=0){
            droids_arr.push(other)
        }      
        else{
            droids_arr.push($(this).val());
        }         
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
        url: "add_data",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            let all_data = result["data"] 
            data = all_data
            console.log("data created",data)
            let added_id = data[Object.keys(data)[Object.keys(data).length - 1]]["id"]
            let newalert = $("<div class='alert alert-success' role='alert'>new item successfully created. View <a href='/view/" + added_id + "'class='alert-link'>here</a>. </div>")
            $("#form_feedback").empty();
            $("#form_feedback").append(newalert)
            
            let title = $("#title").val("");
            $("#title").removeClass('error');  
            let release_year = $("#release_year").val("");
            $("#release_year").removeClass('error');  
            let era = $("#era").val("");
            $("#era").removeClass('error');  
            $("#radio_series input[type='radio']").each(function(){
                $(this).prop('checked',false);
            });
            $("#radio_series").removeClass('error');    
            $("option:selected").prop("selected", false)
            $("#mainchar_div").removeClass('error');  
            $("#droid_div").removeClass('error');  
            let other = $("#other").val("");
            let other2 = $("#other2").val("");
            let summary = $("#summary").val("");
            $("#summary").removeClass('error');  
            let imgurl = $("#image_url").val("");
            $("#image_url").removeClass('error');  
            $("#title").focus();
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
};

function notEmpty(field, type){
    if (type == "text" && field.trim().length != 0){
        return true;
    }
    if (type == "other" && field.length!=0){
        return true;
    }
    else{
        return false;
    }
}

$(document).ready(function(){
    $("#title").focus();

    $( "#addbutton").click(function(index) {
        let title = $("#title").val()
        let release_year = $("#release_year").val()
        let era = $("#era").val()
        let series = $("#radio_series input[type='radio']:checked").val()
        let mains_arr = []
        $.each($("#chars option:selected"), function(){            
            mains_arr.push($(this).val());
        });
        let droids_arr = []
        $.each($("#droids option:selected"), function(){            
            droids_arr.push($(this).val());
        });
        let summary = $("#summary").val()
        let imgurl = $("#image_url").val()
        let fields = ["#title","#era","#summary","#image_url"]
        
        if(notEmpty(title,"text") && notEmpty(release_year,"other") && notEmpty(era,"text")&& notEmpty(series,"other") &&
        notEmpty(mains_arr,"other")&& notEmpty(droids_arr,"other")&& notEmpty(summary,"text") && notEmpty(imgurl,"text")){
            add_entry()
        }
        else{
            $("#form_feedback").empty();
            let newalert = $("<div class = 'alert alert-warning'>")
            $(newalert).text("There are some fields that are empty.")
            $("#form_feedback").append(newalert)
            $.each(fields, function(index,value){  
                if (typeof $(value).val() == "string" && $(value).val().trim().length == 0){
                    $(value).val('');
                    $(value).addClass('error');    
                }
            });
            // if (release_year.toString().length == 0 || typeof release_year !='number'){
            //     $("#release_year").addClass('error');
            //     if (typeof release_year !='number' && release_year.toString().length != 0){
            //         let newalert = $("<div class = 'alert alert-warning'>")
            //         $(newalert).text("Incorrect input type. Expected number input.")
            //         $("#form_feedback").append(newalert)
            //     }
            // }
            if (series == null){
                $("#radio_series").addClass('error'); 
            }
            if (mains_arr.length == 0){
                $("#mainchar_div").addClass('error'); 
            }
            if (droids_arr.length == 0){
                $("#droid_div").addClass('error');  
            }
        }
    });

    $("#addbutton").keypress(function(e){     
        if(e.which == 13) {
            let title = $("#title").val()
            let release_year = $("#release_year").val()
            let era = $("#era").val()
            let series = $("#radio_series input[type='radio']:checked").val()
            let mains_arr = []
            $.each($("#chars option:selected"), function(){            
                mains_arr.push($(this).val());
            });
            let droids_arr = []
            $.each($("#droids option:selected"), function(){            
                droids_arr.push($(this).val());
            });
            let summary = $("#summary").val()
            let imgurl = $("#image_url").val()
            let fields = ["#title","#era","#summary","#image_url"]
            
            if(notEmpty(title,"text") && notEmpty(release_year,"other") && notEmpty(era,"text")&& notEmpty(series,"other") &&
            notEmpty(mains_arr,"other")&& notEmpty(droids_arr,"other")&& notEmpty(summary,"text") && notEmpty(imgurl,"text")){
                add_entry()
            }
            else{
                let newalert = $("<div class = 'alert alert-warning'>")
                $(newalert).text("There are some fields that are empty.")
                $("#form_feedback").append(newalert)
                $.each(fields, function(index,value){  
                    if (typeof $(value).val() == "string" && $(value).val().trim().length == 0){
                        $(value).val('');
                        $(value).addClass('error');    
                    }
                });
                if (release_year.toString().length == 0){
                    $("#release_year").addClass('error');
                }
                if (series == null){
                    $("#radio_series").addClass('error'); 
                }
                if (mains_arr.length == 0){
                    $("#mainchar_div").addClass('error'); 
                }
                if (droids_arr.length == 0){
                    $("#droid_div").addClass('error');  
                }
            }
        }   
    })
})




