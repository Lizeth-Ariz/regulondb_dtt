import React from "react";
import ReactTooltip from "react-tooltip";

const Tooltip = ({ id_canvas = "", dna_elements = [] }) => {
  return (
    <React.Fragment>
      {dna_elements.map((ele) => {
        return (
          <ReactTooltip
            id={`${id_canvas}-${ele.id}`}
            place="bottom"
            effect="float"
            key={ele.id}
          >
            <div dangerouslySetInnerHTML={{ __html: ele.tooltip }} />
          </ReactTooltip>
        );
      })}
    </React.Fragment>
  );
};

export default Tooltip;
