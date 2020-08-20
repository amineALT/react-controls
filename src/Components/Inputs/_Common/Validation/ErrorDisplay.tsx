import * as React from 'react'

import UpSvgIcon from '../../../Display/SvgIcon' 
import  UpTooltip, { Tooltip } from '../../../Display/Tooltip'
import { style } from 'typestyle'
import defaultTheme, { WithThemeProps } from '../../../../Common/theming';

export type ErrorDisplayMode = 'inline' | 'tooltip';

export interface ErrorDisplayProps {
    error: string;
    showError: boolean;
    hasError: boolean;
    displayMode?: ErrorDisplayMode;
}

const getErrorDisplayStyle = (props: ErrorDisplayProps & WithThemeProps) => style({
    position:"relative", 
    cursor: (props.displayMode==="tooltip" && props.hasError)?"help":"default",
    height:"100%",
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    $nest: {
        "& .up-wrapper-error-tooltip" : {
            display:"inline-block",
            position:"absolute",
            top:"8px",
            left:"-20px"
        },
        "& .up-wrapper-error-inline": {
            display: "inline-block",
            color: props.theme.colorMap.error,
            fontSize: '8pt',
        }
    }
}) ;

export default class ErrorDisplay extends React.Component<ErrorDisplayProps & WithThemeProps> {
    
    static defaultProps = {
        displayMode: 'tooltip',
        theme: defaultTheme,
    }

    constructor(p, c) {
        super(p, c);
    }

    render() {

        let Error = ErrorTooltip ;
        if(this.props.displayMode==='inline') {
            Error = ErrorInline ;
        }
        return (<div className={getErrorDisplayStyle(this.props)}>
            {this.props.children}
            {this.props.showError === true && this.props.hasError === true ? 
                (<Error {...this.props} />) : null}
        </div>)
    }
}

const ErrorTooltip = (props: ErrorDisplayProps) => {
    return (<div className={"up-wrapper-error-tooltip"}>
        <UpTooltip content={props.error}>
            <UpSvgIcon width={15} height={15} iconName="error-sign" color={"red"} />
        </UpTooltip></div>) 
}

const ErrorInline = (props: ErrorDisplayProps) => {
    return (<div className={"up-wrapper-error-inline"}>{props.error}</div> );
};