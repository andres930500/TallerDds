module.exports = {
    readFile,
    writeFile
};

const { error } = require('console');
const fs = require('fs');


function readFile(name){


    try{
        let data = fs.readFileSync(name, 'utf8');
        data=JSON.parse(data);
        console.log(data);
        return data;
    }catch{

        return [];
    }
}

    function writeFile(name, data){


        try{
            fs.writeFileSync(name,JSON.stringify(data));
            

        }
        catch{

            console.error(error)

        }
    }








