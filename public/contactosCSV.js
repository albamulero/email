// The event listener for the file upload
document.getElementById('txtFileUpload').addEventListener('change', upload, false);
// Method that checks that the browser supports the HTML5 File API
function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    isCompatible = true;
    }
    return isCompatible;
}
// Method that reads and processes the selected file
function upload(evt) {



    if (!browserSupportFileUpload()) {
        alert('The File APIs are not fully supported in this browser!');
        } else {

            alert('Inicia proceso de csv 1')

            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
                alert('Estoy en unload');
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                if (data && data.length > 0) {
                  alert('Imported -' + data.length + '- rows successfully!');
                  console.log("27", data)
                  // Recorrer el array y enviar los datos al servidor    
                  for(i = 0; i < data.length; i++) {
                    console.log(i);
                    console.log(data[i][0]);
                    // Construdir el JSON para enviarlo al backend y realizar el alta
                    let data_alta = {   
                        id:'',
                        email:`${data[i][2]}`,
                        nombre: `${data[i][0]}`,
                        apellido: `${data[i][1]}`,
                        pais: `${data[i][3]}`,
                        id_usuarios: sessionStorage.getItem('session')
                    }
                    console.log(data_alta)
                    jQuery.ajax({
                        url:'/alta',
                        data: data_alta,
                        type:'POST',
                        dataType:'json'
                    
                    }).then(function(response) {
                        console.log(response);
                    })
                }
            } else {
                alert('No data to import!');
            }
        };
        reader.onerror = function() {
            alert('Unable to read ' + file.fileName);
            
        };
        
    }
} 
