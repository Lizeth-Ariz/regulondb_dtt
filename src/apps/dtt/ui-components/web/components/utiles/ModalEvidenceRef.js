import React from 'react';
import Modal from '../../../output/modal/Modal'

const ModalER = ({
    cit,
    title,
    classNameModal,
    k,
}) => {
    const evi = cit?.evidence
    const pub = cit?.publication
    let styleStrong = {}
    try {
    if (evi?.type === "Strong") {
        styleStrong = { fontWeight: "bold" }
    }
        const eviref = `
            <h2>Evidence</h1>
            <h1>${evi?.code}: ${evi?.name}
            <br>(${evi?.type})
            </h1>
            <h2>Reference:</h2>
            <h2><a href="${pub?.url}" target="_blank" rel="noopener noreferrer" >Go to Refence</a></h2>
            <p>pmid:${pub?.pmid}</p>
            <p class="citation">${pub?.citation}</p>
        `
    return ( 
        <Modal className={`aBase ${classNameModal}`} style={styleStrong} title={title} info={eviref} />
     );
    } catch (error) {
        console.log("edivence error: ",error)
        return ( <></> );
    }
    
}

export default ModalER;