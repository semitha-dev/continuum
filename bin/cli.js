#!/usr/bin/env node
//developed by semitha-dev
//version 0.1
import fs from "node:fs"
const IGNORED_FOLDERS = ["node_modules", ".git", ".next", ".vercel"];
const CAMOUFLAGE_PATTERN = / {200,}\S/


const target = process.argv[2];


function scanFolder (folderPath) {
    const entries = fs.readdirSync(folderPath);

    entries.forEach(function(entry) {
        const fullPath = folderPath + "/" + entry;
        const info = fs.statSync(fullPath);

        if (info.isDirectory() && IGNORED_FOLDERS.includes(entry)) {

        }else if(info.isDirectory()) {
            scanFolder(fullPath)
        }else{
            const rawBuffer = fs.readFileSync(fullPath)

            if(!rawBuffer.includes(0)){
                const contents = fs.readFileSync(fullPath, "utf-8");
                const cleaned = contents.replace(/\r\n/g, "\n")
                const lines = cleaned.split("\n");

                lines.forEach(function(line){
                    if(line.length > 500){
                        if (CAMOUFLAGE_PATTERN.test(line)){
                            console.log("malware detected",line)
                        }
                    }
                })
            }
        }
    
    })

}

scanFolder(target)