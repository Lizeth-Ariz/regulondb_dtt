import * as d3 from "d3";

export function validateData(fileText) {
  let dnaFeaturesData = null
  try {
    dnaFeaturesData = JSON.parse(fileText);
    return dnaFeaturesData.data
  } catch (error) {
    //console.log(error)
    const header = fileText.split("\n")
    let column = header[0].split(",")
    if (column.length >= 3) {
      if (validateColumn(column)) {
        dnaFeaturesData = d3.csvParse(fileText, function (data) {
          return data;
        });
        //console.log(dnaFeaturesData);
      }
    } else {
      column = header[0].split("\t")
      if (column.length >= 3) {
        if (validateColumn(column)) {
          dnaFeaturesData = d3.tsvParse(fileText, function (data) {
            return data;
          });
          //console.log(dnaFeaturesData);
        }

      }

    }
  }
  try {
    dnaFeaturesData["columns"] = {}
  } catch (error) {
    //console.error("error validate data from form")
    dnaFeaturesData = null
  }
  //console.log(dnaFeaturesData["columns"])
  return dnaFeaturesData
}


function validateColumn(column) {
  const found = column.find(colum => colum === "objectType");
  const left = column.find(colum => colum === "leftEndPosition");
  const rigth = column.find(colum => colum === "rightEndPosition");
  const strand = column.find(colum => colum === "strand");
  //console.log(found,left,rigth,strand)
  if (found && left && rigth && strand) {
    return true
  }
  alert("ERROR: some of the required columns are missing")
  return false;
}

