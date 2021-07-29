/**
# Component (user guide)

# Component name 
[CheckBoxGroup --v1.0.5]

## Description  
[Component allows you to group checkbox components]

## Category   
[Structural, functional]  

## Live demo 
[-]

## Installation 
[-]

## Usage 
[---]

## Props 

| prop                 | type   | default | description                                              |
| -------------------- | ------ | ------- | -------------------------------------------------------- |
| arrayOptions         | array  | []      | Set of options for the checkbox group                    |
| arraySelectOptions   | array  | []      | Set of options selected for the checkbox group           |
| arrayDisabledOptions | array  | []      | Set of options not available for the checkbox group      |
| title                | string | []      | Title of the checkbox group                              |
| onChange             | func   |         | Function you receive when there are changes in the group |

## Exception
__ Warning __  
checkboxGroup does not have an added function for the change in prop \"onChange\"

## License
[MIT]

## Author 
[CCG-UNAM-RegulonDB]

**/

/**
# Component (technical guide)
## Component Type 
[Hoock]

## Dependencies
[React, {useState}, PropTypes, ui-components CheckBox]

## States

| state         | type  | default                 | description                |
| ------------- | ----- | ----------------------- | -------------------------- |
| selectOptions | array | prop.arraySelectOptions | Status of selected options |

**/

import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckBox from "./CheckBox";

const warnMenssage =
  'CheckboxGroup does not have an added function for the change in prop "onChange"';

const CheckBoxGroup = ({
  arrayOptions = [],
  title = "",
  onChange = () => {
    console.warn(warnMenssage);
  },
  onElementChange = () => {
    return null;
  }
}) => {
  const onChangeSelection = (isCheck, index) => {
    //console.log(selectOptions)
    let options = arrayOptions;
    if (isCheck) {
      options[index].isCheck = false;
    } else {
      options[index].isCheck = true;
    }
    onChange(options);
    //console.log(arrayOptions)
  };

  return (
    <table>
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>
        {arrayOptions.map((option, index) => {
          //console.log(option.isCheck);
          return (
            <tr key={option.id}>
              <td>
                <CheckBox
                  id={option?.id}
                  label={option?.value}
                  value={option?.value}
                  disabled={option?.disabled}
                  isCheck={option?.isCheck}
                  onChange={() => {
                    onChangeSelection(option.isCheck, index);
                    onElementChange(option?.id, option?.isCheck);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CheckBoxGroup;

CheckBoxGroup.propTypes = {
  arrayOptions: PropTypes.array,
  arrayDisabledOptions: PropTypes.array,
  arraySelectOptions: PropTypes.array,
  title: PropTypes.string,
  onChange: PropTypes.func
};
