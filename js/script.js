$(document).ready(function(){
    var img = new Image();
    var url = "https://background-graphics.firebaseio.com";
    var fbRef = new Firebase(url);

    $('#img-submit').on('click', function(e){
        e.preventDefault();
        img.src = $('#img-url').val();
        $('#previewImg').css('display', 'block').css('background-image', 'url("' + img.src + '")').css('height', '300px').css('background-size', 'cover');
        $('#img-submit').css('display', 'none');
        $('#api-submit').css('display', 'block');
    })
    
    function convertFileToDataURLviaFileReader(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
            var reader  = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
    }
    
    $('#api-submit').on('click', function(e){
        console.log('hello');
        e.preventDefault();
        var imageUrl = $('#img-url').val();
        console.log(imageUrl);
        var convertType = 'FileReader';    
        var convertFunction =  convertFileToDataURLviaFileReader;
        convertFunction(imageUrl, function(base64Img){
            $('.base-textbox')
                .val(base64Img)
                .end()
                .show()
            $(function() {
                console.log(fbRef);
                fbRef.push({
                    "image-data": base64Img
                });
            });
            console.log(base64Img);
        });
    })
    
})


