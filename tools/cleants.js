import * as fs from 'fs';

try {
    const dir = './public/src';
    fs.readdir(dir, function (err, files) {
        for(let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.endsWith(".js")) {
                console.log(`unlinking file ${file}`,file);
                fs.unlinkSync(`${dir}/${file}`);            
            }
        }        
    });
}
catch(e) {
    console.log('ignore error'+e)
}