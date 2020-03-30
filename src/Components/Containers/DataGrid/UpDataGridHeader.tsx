import * as React from 'react'
import { style } from "typestyle"
import classnames from 'classnames'
import UpButtonGroup from '../ButtonGroup'
import {  WithThemeProps } from "../../../Common/theming/types";
import defaultTheme from '../../../Common/theming'

export interface HeaderProps {
    title?: string,
    buttons?: any,
    buttonExport?: any
}

const getStyle = (props : WithThemeProps) => {
    return style({
        display: 'flex',
        marginTop: '5px',
        marginBottom: '5px',
        width: '100%',
        $nest: {
            '&.up-data-grid-header .header-title': {
              lineHeight: '21px',
              fontWeight: 'bold',
              fontSize: '18px',
              flexGrow: 1,
              alignSelf: 'center',
              color: props.theme.colorMap.grey1
            },
            '&.up-data-grid-header .up-btn-wrapper': {
                marginLeft: '20px'
              },
        }
    })
}


const UpDataGridHeader = (props: HeaderProps & WithThemeProps) => {
    const { title, theme, buttons, buttonExport } = props

    return (
        <div className={classnames('up-data-grid-header', getStyle({theme}))}>
           { title && <p className={classnames('header-title')}>{title}</p>}
           { (buttons  || buttonExport) && <div>
                <UpButtonGroup isAddOn='right' gutter={1} align={"h"}>
                    {buttons}
                    {buttonExport}
                </UpButtonGroup>
            </div>}
        </div>
    )
}

UpDataGridHeader.defaultProps = {
    theme: defaultTheme,
}


export default UpDataGridHeader;