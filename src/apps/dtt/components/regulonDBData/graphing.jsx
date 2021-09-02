import React, { useState } from 'react'
import GetGeneticElements from '../../webServices/getGeneticElements';
import DttGraphic from "../dttGraphic/DttGraphic";


export default function Graphing(
    {leftEndPosition = 1000,
    rightEndPosition = 20000,
    strand = "both",
    covered = true,
    elements = [
        { id: 1, value: "gene", isCheck: true },
        { id: 2, value: "promoter", isCheck: true },
        { id: 3, value: "operon", isCheck: true },
        { id: 4, value: "tf binding site", isCheck: true },
        { id: 5, value: "rna", isCheck: true },
        { id: 6, value: "riboswitch", isCheck: true },
        { id: 7, value: "traslational attenuattor", isCheck: true },
        { id: 8, value: "trascriptional attenuattor", isCheck: true },
        { id: 9, value: "ppGpp", isCheck: true }
    ]}
) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    if (_data) {
        //console.log(_data)
        return <DttGraphic id_canvas={"0120"} dnaFeatures_data={_data} />
    }

    //console.log(leftEndPosition,rightEndPosition)

    return (
        <div>
            <GetGeneticElements 
                leftEndPosition={leftEndPosition} 
                rightEndPosition={rightEndPosition}  
                resoultsData={(data) => { set_data(data) }} 
            />
        </div>
    )
}
