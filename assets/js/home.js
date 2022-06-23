$(document).ready(()=>{
    $('#form').submit(function(e){
        e.preventDefault();
        var formData = new FormData($('#form')[0]);
        $('#form')[0].reset()
        $.ajax({
            url:'/upload',
            type:'POST',
            dataType:'json',
            cache: false,
        contentType: false,
        processData: false,
            data:formData,
            success:function(data,status,xhr){
                   const file = $(`<div class="file" id=${data.fileName} >
                   <p class="fileName">${data.fileName}</p>
               </div>`)
                   $('.filesCont').prepend(file)
                   
            },
            
            
        })
    })
    $('body').on('click','.file',function(){
        window.open(document.URL+'download/'+$(this).find('p').html())
    })
    
})