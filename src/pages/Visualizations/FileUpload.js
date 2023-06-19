import React, { useState } from "react";
import {uid} from '@hisptz/dhis2-utils'
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

        const fileId = uid();

        localStorage.setItem(fileId, JSON.stringify(data));
        navigate(`${fileId}`)
    };
    return (
        <div>
            <FileInputField type="file" accept=".csv, .json, .xlsx" onChange={handleFileUpload} />
        </div>
    );
};

export default FileUploader;

