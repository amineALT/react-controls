// Imports
import { UpNotificationProps } from './types';
import { NestedCSSProperties } from 'typestyle/lib/types';
import * as classnames from 'classnames';
import { style, keyframes } from 'typestyle';
import { WithThemeProps } from '../../../Common/theming/withTheme';
import { toRem } from '../../../Common/theming/utils';

export const colors = (props: UpNotificationProps & WithThemeProps): NestedCSSProperties => {
    return {
        position: 'relative',
        backgroundColor:
            props.displayMode === 'text'
                ? 'transparent'
                : props.theme.colorMap[`${props.intent}`] ||
                props.theme.colorMap.white3,
        color:
            props.theme.colorMap[`${props.intent}Dark`] ||
            props.theme.colorMap.darkGray5,
        borderRadius:
            props.displayMode === 'text' ? 0 : props.theme.borderRadius,
        $nest: {
            '& p, & span, & div, & em, & strong': {
                fontWeight: 400,
                textAlign: 'left',
                color:
                    props.displayMode === 'text'
                        ? props.theme.colorMap[`${props.intent}`]
                        : props.theme.colorMap.white1 ||
                        props.theme.colorMap.darkGray5
            }
        }
    };
};

export const icon = (props: UpNotificationProps & WithThemeProps): NestedCSSProperties => {
    const iconWithBorderStyle: NestedCSSProperties = {
        display: 'flex',
        marginLeft: toRem(25),
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: toRem(25),
        minHeight: toRem(25),
        border: '1px solid white',
        borderRadius: toRem(360)
    };
    const iconContainerStyle: NestedCSSProperties =
        props.intent === 'success' ||
            props.intent === 'error' ||
            props.intent === 'danger'
            ? { marginLeft: toRem(25) }
            : iconWithBorderStyle;
    return {
        $nest: {
            '& .up-notification .up-notification-icon-container': {
                ...iconContainerStyle
            },
            '& .up-notification .colored svg, & .up-notification .colored svg path, & .up-notification .colored svg polygon, & .up-notification .colored svg polyline': {
                fill:
                    props.displayMode === 'text'
                        ? props.theme.colorMap[`${props.intent}`]
                        : props.theme.colorMap.white1,
                //margin: "10px",
                display: 'inline-block',
                background: 'unset !important'
            },
            '& .up-notification .cancel-icon': {
                position: 'absolute',
                top: toRem(10),
                right: toRem(10),
                cursor: 'pointer'
            },
            '& .up-notification .cancel-icon svg path': {
                fill: props.theme.colorMap.white1
            }
        }
    };
};

export const text = (props): NestedCSSProperties => {
    return {
        $nest: {
            '& .up-notification .up-notification-message': {
                marginLeft: toRem(25),
                whiteSpace: 'pre-line'
            }
        }
    };
};

export const progressBar = (props): NestedCSSProperties => {
    const progress = keyframes({
        from: {
            width: '0%'
        },
        to: {
            width: '100%'
        }
    });
    return {
        $nest: {
            '& .up-notification-progress-bar-container': {
                position: 'absolute',
                backgroundColor: props.theme.colorMap.grey1,
                width: '100%',
                borderBottomRightRadius: '4px',
                borderBottomLeftRadius: '4px',
                bottom: '0px',
                right: '0px'
            },
            '& .up-notification-progress-bar': {
                width: '100%',
                height: '4px',
                animationPlayState: 'running',
                animation: `${progress} ${props.durationBeforeClosing}s`,
                backgroundColor: props.theme.colorMap.gray6,
                borderBottomRightRadius: '4px',
                borderBottomLeftRadius: '4px'
            },
            '&.up-notification-container:hover .up-notification-progress-bar': {
                animationPlayState: 'paused'
            },
            '&.up-notification-container': {
                borderRadius: '0 0 4px 4px'
            }
        }
    };
};

export const getStyles = (props: UpNotificationProps): string => {
    return classnames(
        style(colors(props)),
        style(icon(props)),
        style(text(props)),
        style(progressBar(props)),
        style({
            width: '100%',
            padding: toRem(8),
            borderRadius: '4px',
            boxSizing: 'border-box',
            minHeight: toRem(100),
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
        })
    );
};
