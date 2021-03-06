import * as React from 'react'
import * as update from 'react-addons-update'

import { storiesOf } from '@storybook/react'

import UpTooltip from './'

import UpLigne from '../Ligne'
import UpPanel from '../../Containers/Panel'

import UpDefaultTheme from '../../../Common/theming'
import { ThemeProvider as UpThemeProvider } from '../../../Common/theming/themedComponents'

const TooltipRenderer = (<div>
    <p style={{padding:"10px"}}>
        Pour plus d'info, veuillez consulter le site de notre produit...
    </p>
</div>) ;

storiesOf('UpTooltip', module)
.addWithInfo('Simple usage', 'Utilisation du composant en lui passant les données à afficher',
 () => (
    <UpThemeProvider theme={UpDefaultTheme}>
        <div style={{margin:"30px"}}>
            <UpPanel type={"primary"}>
                Exemple d'utilisation du composant 
                <UpTooltip title={"Détails"} content={TooltipRenderer}>
                    <UpLigne>&nbsp;<code>&lt;UpTooltip /&gt;</code>&nbsp;</UpLigne>
                </UpTooltip> sur du texte.
            </UpPanel>
        </div>
    </UpThemeProvider>
)).addWithInfo('Sur un lien', 'Utilisation du composant en lui passant les données à afficher',
() => (
   <UpThemeProvider theme={UpDefaultTheme}>
       <div style={{margin:"30px"}}>
           <UpPanel type={"primary"}>
               Exemple d'utilisation du composant 
               <UpTooltip id={"Tooltip"} title={"Détails"} content={TooltipRenderer}>
                   <a data-for={"Tooltip"} data-tip="React-tooltip">◕‿‿◕</a>
               </UpTooltip> sur du texte.
           </UpPanel>
       </div>
   </UpThemeProvider>
))
