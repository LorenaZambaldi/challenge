var Converter = require("csvtojson").Converter;
var converter = new Converter({});

// estrutura de aluno
function Aluno () {
    var fullname;
    var eid;
    var classes = [];
    var addresses = [];
    var invisible;
    var see_all;
}

// estrutura de addres
function Addresses () {
    var type;
    var tags = [];
    var address;
}


//abre o arquivo input.csv em formato de json simples
converter.fromFile("input.csv",function(err,result){
    if(err){
        console.log("Erro ao abrir csv em json");
        console.log(err);  
    } 

	
    //cria array de alunos
    var alunos = [];

    //percorre cada linha da csv para formatar os dados
    for(var contador = 0; contador< result.length;contador++){
        
        var aluno = new Aluno();
        var addresses = [];
        var fullname;
        var eid;
        var classes = [];
        var invisible;
        var see_all;

        //dentro de cada linha percorre as colunas existentes tentando achar as colunas pre definidas 
        for(tag in result[contador]){
			
			// coluna fullname
            if(tag == 'fullname'){
				fullname = result[contador][tag];
			
			}
				
			
            // coluna eid
            if(tag == 'eid'){
                eid = result[contador][tag];
				
            }

            // coluna class
            if(tag == 'class'){
                classes = result[contador][tag].split(',');
                for(var contadorClasses = 0; contadorClasses< classes.length;contadorClasses++){
                    classes[contadorClasses] = classes[contadorClasses].trim();
                }
            }

            // coluna com palavra email
            if(tag.includes("email")){
                var address = new Addresses();
                address.type = "email"
                address.tags = tag.replace("email","").trim().split(',')
                for(var contadorTags = 0; contadorTags < address.tags.length; contadorTags++){
                    address.tags[contadorTags] = address.tags[contadorTags].trim();
                }
                address.address = result[contador][tag];
                addresses.push(address);
            }

            // coluna com palavra phone
            if(tag.includes("phone")){
                var address = new Addresses();
                address.type = "phone"
                address.tags = tag.replace("phone","").trim().split(',')
                for(var contadorTags = 0; contadorTags < address.tags.length; contadorTags++){
                    address.tags[contadorTags] = address.tags[contadorTags].trim();
                }
                address.address = '55' + result[contador][tag].replace(/[^\d]+/g,'');
                addresses.push(address);
            }

            // coluna invisible
            if(tag == 'invisible'){
                if(result[contador][tag] == 1){
                    invisible = true;
                }else{
                    invisible = false;
                }
            }

            // coluna see_all
            if(tag == 'see_all'){
                if(result[contador][tag].trim() == "yes"){
                    see_all = true;
                }else{
                    see_all = false;
                }
            }
        }
		
		


        
        //joga dados tratados pra a estrutura aluno e coloca em um array de alunos
        
		aluno.fullname = fullname;
        aluno.eid = eid;
        aluno.classes = classes;
        aluno.addresses = addresses;
        aluno.invisible = invisible;
        aluno.see_all = see_all;
		
		// verifica os nomes repetidos
		if (alunos.findIndex(aluno => aluno.fullname === fullname) == -1){
			
        alunos.push(aluno);
		}
	
 
	
  }


  
    
    // cria e salva json a partir do array de alunos
    var fs = require('fs');
    fs.writeFile("output.json", JSON.stringify(alunos), function(err) {
        if(err) {
            console.log("Erro ao criar arquivo json");
            console.log(err);  
        } else {
            console.log("Salvo com sucesso");
        } 
    });    
});