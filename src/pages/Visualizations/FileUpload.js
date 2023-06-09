import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { read, utils } from 'read-excel-file';
import csvtojson from 'csvtojson';
import { FileInputField } from "@dhis2/ui"
import { useNavigate } from "react-router";

import { useAlert } from "@dhis2/app-runtime";


const convertCsvToJsonArray = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const jsonEntry = {};


    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(",");


        for (let j = 0; j < headers.length; j++) {
            jsonEntry[headers[j]] = currentLine[j];
        }

    }

    return jsonEntry;

};


const FileUploader = () => {
    const navigate = useNavigate();
    const {show} = useAlert(`Data structure not supported`, {info: true})

    const handleFileUpload = async ({ files }, event) => {
        
        const file = files[0]; // Get the first file from the selected files array

        

        let data = [];


        const fileSize = file.size / 1024 / 1024; // Calculate file size in MB

        if (fileSize > 2) {
       // File size exceeds 2MB, handle the error
            alert("File size exceeds 2MB limit.");
           return;
           }

        switch (file.type) {
            case "application/json":
                data = JSON.parse(await file.text());
                break;

            default:
                const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        }


        if (!Array.isArray(data)) {
            console.error('Data structure not supported');
            show();
            return;
        }

        const name = file.name.split('.')?.[0];

        localStorage.setItem(name, JSON.stringify(data));
        navigate(`${name}`)
    };
    return (
        <div>
            <FileInputField type="file" accept=".csv, .json, .xlsx" onChange={handleFileUpload} />
        </div>
    );
};

export default FileUploader;


// if (file) {
//     const fileSize = file.size / 1024 / 1024; // Calculate file size in MB

//     if (fileSize > 2) {
//         // File size exceeds 2MB, handle the error
//         alert("File size exceeds 2MB limit.");
//         return;
//     }

//     const reader = new FileReader(file);
//     reader.onload = (e) => {
//         const fileData = e.target.result; // File content

//         console.log(fileData)
//         let jsonArray = [];
//         // Process the file based on its type
//         if (file.name.endsWith(".csv")) {
//             //         const jsonArray = csvtojson().fromString(fileData);
//             //   console.log('JSON Content:', jsonArray);
//             jsonArray = convertCsvToJsonArray(fileData);
//             console.log(jsonArray);
//             // Use the jsonArray as needed
//         } else if (file.name.endsWith(".json")) {
//             jsonArray = JSON.parse(fileData);
//             console.log(jsonArray);
//             // Use the jsonArray as needed
//         } else if (file.name.endsWith(".xlsx")) {
//             const workbook = XLSX.read(fileData, { type: "array" });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//             const headers = jsonData[0];
//             value
//             for (let i = 1; i < jsonData.length; i++) {
//                 const currentRowData = jsonData[i];
//                 const jsonEntry = {};

//                 for (let j = 0; j < headers.length; j++) {
//                     jsonEntry[headers[j]] = currentRowData[j];
//                 }

//                 jsonArray.push(jsonEntry);
//             }
//             console.log(jsonArray);
//             // Use the jsonArray as needed
//         }
//     };

//     reader.readAsArrayBuffer(file);
// }