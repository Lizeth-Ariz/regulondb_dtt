import { validation } from "./validation/validation";
import CONF from "./conf.json"
//import overlaping from "./overlaping/overlaping";
import ordering from "./ordering/ordering";
import canvas from "./canvaBuilder/canva";
import DNAbuilder from "./dnaBuldier/dna";
import Draw from "./features_draw/draw";

export default function DrawingTracesTool(idDrawPlace, idCanvas,dnaFeatures_data,draw_name="draw",auto_adjust=false) {
    if(!dnaFeatures_data || !idDrawPlace || !idCanvas){
        return null
    }
    dnaFeatures_data = validation(dnaFeatures_data)
    dnaFeatures_data = ordering(dnaFeatures_data)
    const CANVAS = canvas(idDrawPlace,idCanvas,dnaFeatures_data,CONF,auto_adjust)
    if(!CANVAS){
        console.error("build canvas error")
        return null
    }
    const DNA = DNAbuilder(CANVAS,dnaFeatures_data,CONF)
    if(!DNA){
        console.error("build draw dna error")
        return null
    }
    Draw(CANVAS,DNA,dnaFeatures_data,CONF)
}