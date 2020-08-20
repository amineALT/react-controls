import * as React from 'react';
import * as classnames from 'classnames';
import UpButton from '../../Inputs/Button/UpButton';
import UpSvgIcon from '../../Display/SvgIcon';
import UpTooltip from '../../Display/Tooltip/UpTooltip';
import UpLigne from '../../Display/Ligne/UpLigne';
import { style } from 'typestyle';

import { CSSProperties } from 'typestyle/lib/types';

import {
  DisplayType,
  Action,
  Column,
  TitleFormatter
} from './UpDataPanel';
import _ = require('lodash');

export interface PanelItemProps {
  className?: string;
  title?: {
    general: TitleFormatter | JSX.Element | string;
    specific?: TitleFormatter | JSX.Element | string;
  };
  displayMode?: DisplayType;
  actions?: Array<Action>;
  panelData: {};
  columns: Array<Column>;
  showOnlyNotEmptyValue: boolean;
}

const getStyle = props => {
  const tooltipStyle: CSSProperties =
    props.displayMode === 'row'
      ? { position: 'absolute', bottom: '15px' }
      : { position: 'absolute', top: '-5px', right: '-20px' };
  return style({
    border: '1px solid #DEDDDD',
    borderRadius: '4px',
    padding: '25px 30px 13.5px 50px',
    $nest: {
      '& .panel-body': {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '14px',
        position: 'relative'
      },
      '& .panel-col': {
        display: 'flex',
        flexDirection: `${props.displayMode}`,
        marginRight: '37px',
        marginBottom: '8px',
        position: 'relative',
        alignItems: props.displayMode === 'row' ? 'center' : 'normal'
      },
      '& .panel-col-label': {
        color: props.theme.colorMap.gray6,
        fontSize: '14px',
        lineHeight: '16px'
      },
      '& .panel-col-value': {
        color: props.theme.colorMap.grey1,
        marginLeft: props.displayMode === 'row' ? '4px' : '',
        fontSize: '14px',
        lineHeight: '16px'
      },
      '& .panel-title': {
        marginBottom: '30px'
      },
      '& .panel-title-general': {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#4B5C59'
      },
      '& .panel-title-specific': {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#4B5C59',
        marginLeft: '4px'
      },
      '& .col-tooltip': {
        ...tooltipStyle
      },
      '& .panel-actions': {
        position: 'absolute',
        right: 0,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        bottom: 4
      }
    }
  });
};

const UpDataPanelItem = (props: PanelItemProps) => {
  const {
    panelData,
    className,
    title,
    displayMode,
    columns,
    showOnlyNotEmptyValue
  } = props;

  const Tooltip = props => (
    <UpTooltip
      title={props.tooltip.title}
      place="bottom"
      content={props.tooltip.content}>
      <UpLigne>
        <UpSvgIcon
          width={16}
          height={16}
          iconName="info"
          className="col-tooltip"
        />
      </UpLigne>
    </UpTooltip>
  );

  return (
    <div
      className={classnames(
        'panel-container',
        className,
        getStyle(props)
      )}>
      {title && (
        <div className="panel-title">
          <span className="panel-title-general">
            {_.isFunction((title.general as TitleFormatter).format) && (title.general as TitleFormatter).format(panelData)}
            {_.isString(title.general) && title.general}
          </span>
          {title.specific && 
            <span className="panel-title-specific">
              {_.isFunction((title.specific as TitleFormatter).format) && (title.specific as TitleFormatter).format(panelData)}
              {_.isString(title.specific) && title.specific}
            </span>
          }
        </div>
      )}
      <div className="panel-body">
        {columns.map((element, index) =>
          (panelData[element.field] && showOnlyNotEmptyValue) ||
          !showOnlyNotEmptyValue ? (
            <React.Fragment key={index}>
              <div className="panel-col">
                <span className="panel-col-label">
                  {element.label}
                  {displayMode === 'row' ? ': ' : null}
                </span>
                {element.formatter ? (
                  element.formatter.format(
                    panelData,
                    element,
                    element.getFormatterProps
                      ? element.getFormatterProps(
                          panelData[element.field]
                        )
                      : {}
                  )
                ) : (
                  <span className="panel-col-value">
                    {panelData && panelData[element.field]}
                  </span>
                )}
                {element.tooltip && (
                  <Tooltip tooltip={element.tooltip} />
                )}
              </div>
            </React.Fragment>
          ) : null
        )}
        {props.actions && (
          <div className="panel-actions">
            {props.actions.map((element, index) => (
              <UpButton
                key={`panel-action-${index}`}
                actionType={element.type}
                intent={element.intent}
                width="icon"
                borderless
                className={style({
                  $nest: {
                    '& .up-btn ,& .up-btn svg': {
                      width: '44px !important',
                      height: '44px !important'
                    }
                  }
                })}
                onClick={() => element.action({value:{...panelData}})}></UpButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
UpDataPanelItem.defaultProps = {
  displayMode: 'row',
  showOnlyNotEmptyValue: false
};

export default UpDataPanelItem;
