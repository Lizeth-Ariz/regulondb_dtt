import React, { useState } from 'react';
import { Button } from '../../index'
import Style from './tabs.module.css'


export const Tabs = ({
    tabsInfo = [{ id: '01', name: 'tab', disabled: false }, { id: '02', name: 'tab2', disabled: false }],
    tabSelect = '01',
    tabs = [<div id='01'>contenido 1 </div>, <div id='02'> contenido 2 </div>]
}) => {
    const [_tab, set_tab] = useState(tabSelect)

    return (
        <div >
            <nav className={Style.tabHeader}>
                {
                    tabsInfo.map((tab) => {
                        let styleTab = style_Tab
                        if (tab.id === _tab) {
                            styleTab = style_TabActive
                        }
                        if (tab.disabled) {
                            return null
                        }
                        return (
                            <div key={`tab_${tab.id}-${tab.name}`} className={Style.tabContent}>
                                <Button id={tab.id} style={styleTab} label={tab.name} onClick={() => { set_tab(tab.id) }} />
                            </div>
                        )
                    })
                }
            </nav>
            {
                tabs.map((tab)=>{
                    //console.log(tab.props?.id )
                    //console.log(_tab)
                    if(tab.props?.id === _tab){
                        return <div key={`tabContent_${_tab}_CCDFG`}>
                            {tab}
                        </div>
                    }
                    return null
                })
            }
        </div>
    );
}

const style_Tab = {
    backgroundColor: '#ffffff',
    color: '#373737',
    borderTop: "1px solid #666666",
    borderRight: "1px solid #666666",
    borderBottom: "3px solid #32617D",
    borderLeft: "1px solid #666666"
}

const style_TabActive = {
    backgroundColor: "#ffffff",
    color: "#3D779B",
    fontWeight: "bold",
    borderTop: "3px solid #32617D",
    borderRight: "2px solid #32617D",
    borderLeft: "2px solid #32617D"
}