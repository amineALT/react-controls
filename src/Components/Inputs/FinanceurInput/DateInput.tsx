import * as React from "react"
import { style } from "typestyle"

import { isNullOrUndef, stringIsNullOrEmpty, getFontClassName, formatDate, } from "../../../Common/utils/helpers";
import { IconInfos, IconSuccess, IconError, } from "../../Display/Icons/Icons";

import { ValidationReturn, GetFinanceurColors, ColorSet } from ".";
import Calendrier from "./Calendrier";


export interface DateInputProps {
    Value?: Date | string;
    Placeholder?: string;
    Disable?: boolean;
    Label?: string;
    Icon?: JSX.Element;
    InformationText?: string;
    SuccessText?: string;
    ErrorText?: string;
    Width?: string;
    Require?: boolean;
    ReadOnly?: boolean;
    InitialState?: boolean;
    AutoFocus?: boolean;
    Validate?: (value: Date | string) => ValidationReturn;
    onChange?: (value: Date | string) => void;
    onFocus?: (event) => void;
    onBlur?: (event) => void;
    onKeyDown?: (event, isAbort?: boolean) => void;
}

export interface DateInputState {
    Success?: boolean;
    Value: Date | string;
    TextCanChange: boolean;
    SpecificMessage: string;
}

export default class DateInput extends React.Component<DateInputProps, DateInputState> {
    private control: any;
    private _calendar: any;

    constructor(p, c) {
        super(p, c);
        this.state = {
            Success: isNullOrUndef(this.props.InitialState) ? null : this.props.InitialState,
            Value: this.props.Value,
            TextCanChange: this.props.ReadOnly !== true,
            SpecificMessage: null,
        };
    }

    private processValidation = (value: Date) => {
        var validation: ValidationReturn = isNullOrUndef(this.props.Validate) ? null : this.props.Validate(value);

        if (isNullOrUndef(validation) || isNullOrUndef(validation.ok)) {
            this.setState({ Value: value, Success: null, SpecificMessage: null, });
        } else {
            this.setState({ Value: value, Success: validation.ok, SpecificMessage: validation.specificMessage, });
        }
    }
    private doNumberDown = () => {
        if (this.props.ReadOnly || this.props.Disable) {
            return ;
        }
        
        // var saveOldValue: Date = this.state.Value;
        // var valeur: number = isNullOrUndef(this.state.Value) ? -1 : (Number(this.state.Value) - 1);
        // if (isNullOrUndef(this.props.NumberMax) === false && this.props.NumberMax < Number(valeur)) {
        //     valeur = this.props.NumberMax;
        // } else if (isNullOrUndef(this.props.NumberMin) === false && this.props.NumberMin > Number(valeur)) {
        //     valeur = this.props.NumberMin;
        // }
        // this.processValidation(valeur.toString());
        // if ((! isNullOrUndef(this.props.onChange)) && saveOldValue !== valeur.toString()) {
        //     this.props.onChange(valeur.toString());
        // }
    }
    private doNumberUp = () => {
        if (this.props.ReadOnly || this.props.Disable) {
            return ;
        }

        // var saveOldValue: Date = this.state.Value;
        // var valeur: number = stringIsNullOrEmpty(this.state.Value) ? 1 : (Number(this.state.Value) + 1);
        // if (isNullOrUndef(this.props.NumberMax) === false && this.props.NumberMax < Number(valeur)) {
        //     valeur = this.props.NumberMax;
        // } else if (isNullOrUndef(this.props.NumberMin) === false && this.props.NumberMin > Number(valeur)) {
        //     valeur = this.props.NumberMin;
        // }
        // this.processValidation(valeur.toString());
        // if ((! isNullOrUndef(this.props.onChange)) && saveOldValue !== valeur.toString()) {
        //     this.props.onChange(valeur.toString());
        // }
    }

    private onBlur = (event) => {
        this.processValidation(event.target.value);

        if ( ! isNullOrUndef(this.props.onBlur)) {
            this.props.onBlur(event);
        }

        this._calendar.Blur();
    }
    private onChange = (event) => {
        var saveOldValue: Date | string = this.state.Value;
        this.processValidation(event.target.value);

        if ((! isNullOrUndef(this.props.onChange)) && saveOldValue !== event.target.value) {
            this.props.onChange(event.target.value);
        }
    }
    private onKeyDown = (event) => {
        var abort: boolean = false;
        
        if (!this.props.Disable && !this.props.ReadOnly) {
            if (event.keyCode === 38) { // fleche haut
                this.doNumberUp();
                abort = true;
            } else if (event.keyCode === 40) { // fleche bas
                this.doNumberDown();
                abort = true;
            }
        }
        if (abort) {
            event.preventDefault();
            return ;
        }

        if (!this.state.TextCanChange) {
            if (event.keyCode === 9 || (event.keyCode >= 112 && event.keyCode <= 123)) {
                // tabulation ou F1-F12 => on laisse passer
            } else {
                event.preventDefault();
                abort = true;
            }
        }

        if ( ! isNullOrUndef(this.props.onKeyDown)) {
            this.props.onKeyDown(event, abort);
        }
    }

    private onCalendarItemClick = (date: Date) => {
        var saveOldValue: Date | string = this.state.Value;
        this.processValidation(date);

        if ((! isNullOrUndef(this.props.onChange)) && saveOldValue.toString() !== date.toString()) {
            this.props.onChange(date);
        }
    }

    public focus = () => {
        if (!this.props.Disable) {
            this.control.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        var doSetState: boolean = false;
        var value = this.state.Value;
        var success = this.state.Success;
        var specmess = this.state.SpecificMessage;

        if (nextProps.Value !== this.props.Value && nextProps.Value !== this.state.Value) {
            doSetState = true;
            value = nextProps.Value;
            success = null;
            specmess = null;
        }
        if (nextProps.InitialState !== this.props.InitialState && nextProps.InitialState !== this.state.Success) {
            doSetState = true;
            success = isNullOrUndef(nextProps.InitialState) ? null : nextProps.InitialState;
        }

        if (doSetState) {
            this.setState({ Value: value, Success: success, SpecificMessage: specmess, });
        }
    }

    render() {
        var couleurs: ColorSet = GetFinanceurColors(this.props.Disable, this.state.Success);

        var styleG = style({
            width: isNullOrUndef(this.props.Width) ? "250px" : this.props.Width,
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            textAlign: "left",
        });
        var styleLabel = getFontClassName({ color: couleurs.Label, fontSize: "14px", });
        var styleRequire = getFontClassName({ color: "red", fontSize: "14px", lineHeight: 1.36, }) + " " + style({
            position: "absolute",
            top: 0,
            right: 0,
        });
        var styleFontInput = getFontClassName({ color: couleurs.Value, fontSize: "14px", lineHeight: 1.36, });
        var styleInputContainer = style({
            position: "relative",
            width: "100%",
            display: "inline-block",
            $nest: {                
                "& *:focus": {
                    outline: "none",
                },
            },
        });
        var styleInput = style({
            width: "100%",
            border: "none",
            borderBottom: "1px solid " + couleurs.Border,
            paddingBottom: "6px",
            boxSizing: "border-box",
            paddingLeft: (!isNullOrUndef(this.props.Icon) ? 20 : 0).toString() + "px",
            paddingRight: (28 + (this.props.Require ? 6 : 0)).toString() + "px",
            backgroundColor: "inherit",
            $nest: {
                "&:hover": {
                    borderBottomColor: couleurs.BorderFocus,
                },
                "&:focus": {
                    borderBottomColor: couleurs.BorderFocus,
                },
                "&::placeholder": {
                    color: couleurs.Placeholder,
                    opacity: 0.5,
                }
            },
        });
        var styleIcon = style({
            position: "absolute",
            top: 0,
            left: 0,
        });
        var styleChevron = style({
            position: "absolute",
            top: "5%",
            right: (2 + (this.props.Require ? 6 : 0)).toString() + "px",
        });
        var styleIconInfos = style({
            opacity: this.state.Success === false ? 1 : 0.5,
        });
        var styleFontInfos = getFontClassName({ color: couleurs.Value, fontSize: "12px", lineHeight: 1.58, }) + " " + style({
            opacity: this.state.Success === false ? 1 : 0.5,
        });
        var styleFontInfosSuc = getFontClassName({ color: couleurs.Border, fontSize: "12px", lineHeight: 1.58, });
        var styleSousLabel = style({
            textAlign: "justify",
            display: "inline-block",
            width: "100%",
        });

        var texteSup: JSX.Element = null;
        if (this.state.Success) {
            var texteSupStr: string = stringIsNullOrEmpty(this.state.SpecificMessage) ? 
                stringIsNullOrEmpty(this.props.SuccessText) ? "" : this.props.SuccessText : 
                this.state.SpecificMessage;
            if (texteSupStr != "") {
                texteSup = <IconSuccess Color={couleurs.Border} BackgroundColor="" IconSize="16px" >
                    <span className={styleFontInfosSuc} > {texteSupStr}</span>
                </IconSuccess>;
            }
        } else if (this.state.Success !== null) {
            var texteSupStr: string = stringIsNullOrEmpty(this.state.SpecificMessage) ? 
                stringIsNullOrEmpty(this.props.ErrorText) ? "" : this.props.ErrorText : 
                this.state.SpecificMessage;
            if (texteSupStr != "") {
                texteSup = <IconError Color={couleurs.Border} BackgroundColor="" IconSize="16px" >
                    <span className={styleFontInfosSuc} > {texteSupStr}</span>
                </IconError>;
            }
        }
        if (texteSup === null && ! stringIsNullOrEmpty(this.props.InformationText)) {
            texteSup = <IconInfos Color={couleurs.Value} BackgroundColor="" IconSize="16px" className={styleIconInfos} >
                <span className={styleFontInfos} > {this.props.InformationText}</span>
            </IconInfos>;
        } 

        return <span className={styleG} >
            { stringIsNullOrEmpty(this.props.Label) ? null :
                <span className={styleLabel} >
                    {this.props.Label}
                    <br />
                </span>
            }
            
            <span className={styleFontInput + " " + styleInputContainer} >
                { this.props.Require ? <span className={styleRequire} >*</span> : null }

                { isNullOrUndef(this.props.Icon) ? null : 
                    <span className={styleIcon} >{this.props.Icon}</span>
                }
                
                <span className={styleChevron} >
                    <Calendrier ref={(c) => { this._calendar = c; }} onChange={this.onCalendarItemClick} />
                </span>

                <input className={styleFontInput + " " + styleInput} disabled={this.props.Disable} autoFocus={this.props.AutoFocus}
                    value={isNullOrUndef(this.state.Value) ? "" : typeof this.state.Value === "string" ? this.state.Value : formatDate(this.state.Value)} 
                    placeholder={this.props.Placeholder}
                    onFocus={this.props.onFocus} onKeyDown={this.onKeyDown} onBlur={this.onBlur} onChange={this.onChange}
                    ref={(c) => { this.control = c; }} />
            </span>

            <span className={styleSousLabel} >{texteSup}</span>
        </span>;
    }
}