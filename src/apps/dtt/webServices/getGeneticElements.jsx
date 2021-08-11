import React, { useEffect, useState } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``

export function query(leftEndPosition, rightEndPosition) {
    return gql`
    {
        getGeneticElementsFromInterval(
              leftEndPosition: ${leftEndPosition}
              rightEndPosition: ${rightEndPosition}
            ) {
          _id
          leftEndPosition
          rightEndPosition
          objectType
          strand
          objectRGBColor
          labelName
          tooltip
          linkedObjectWhenNoPositions {
            _id
            leftEndPosition
            rightEndPosition
            strand
          }
          relatedGenes {
            gene_id
          }
        }
      }
    `
}

const GetGeneticElements = ({
    leftEndPosition = 100,
    rightEndPosition = 20000,
    status = () => { },
    resoultsData = () => { },
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(leftEndPosition, rightEndPosition))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data && !_res) {
            set_res(true)

            try {
                resoultsData(data.getGeneticElementsFromInterval)
                status('done')
            } catch (error) {
                status('error')
                console.log(error)
            }

        }
        if (error) {
            status('error')
            console.log(error)
        }

    }, [loading, error, status, data, _res, resoultsData])
    if (loading) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export default GetGeneticElements;