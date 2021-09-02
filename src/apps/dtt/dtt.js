/**

# Component (user guide)

# [dtt]
	
## Description  
	
[DrawingTracesTool is a user-friendly tool allowing generating images of elements
related to DNA and involved in gene regulation (such as gene, operon, binding site,
promoter, terminator, attenuator, riboswitch and small RNA).]

## Category   
	
[Visual]  

## Live demo 
[-]

## Installation 
[-]

## Usage 
	
[-]

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
[Lizeth-Ariz <user@aaa.com>]

# Component (technical guide)

## Component Type 

[HOC]

[stateful -> exportan funcion con estate y props, 
  stateless -> exportan funcion con props y sin state , 
  pure -> exporta una funcion sin props sin state, 
  HOC -> exporta una Funcion copuesta, o clase , 
  Hook -> exporta hook (react const) ]

## Dependencies

[import React, { Component } from "react";]
[import Description from "./components/Description";]
[import FormRegulondbData from "./components/FormRegulondbData";]
[import FormUserData from "./components/FormUserData";]
[import DttGraphic from "./components/DttGraphic";]
[import { Cover, Tabs } from "./components/ui-components/index";]

## States
	
| Property | Value | Desctiption |
| -------- | ----- | ----------- |
|          |       |             |   

# Functions description


## [-]

__Description:__  

[Description of the function]

__Usage:__

```javascript
```

__Scope: __

[Scope details]

__Input Parameter:__  
 __event:__ [Description]


__Return:__  
 __Void:__ []

 [Description (if necessary)]



 * 
 */

import React from "react";
import Description from "./components/Description";
import FormRegulondbData from "./components/FormRegulondbData";
import { UserData } from "./components/userData/userData";
import { Cover, Tabs } from "./ui-components/index";

const tabsInfo = [
  { id: "01", name: "RegulonDB-Data", disabled: false },
  { id: "02", name: "User Data", disabled: false }
];

const tabs = [
  <div id="01">
    <article>
      <br />
      <Description />
      <FormRegulondbData />
    </article>
  </div>,
  <div id="02">
    <article>
      <br />
      <Description />
      <UserData />
    </article>
  </div>
];

const DrawingTracesTool = () => {
  return (
    <div>
      <Cover>
        <h1>DrawingTracesTool</h1>
      </Cover>
      <Tabs tabSelect={"01"} tabsInfo={tabsInfo} tabs={tabs} />
    </div>
  );
};

export default DrawingTracesTool;
