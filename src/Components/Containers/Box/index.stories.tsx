import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import UpBox, { UpBox as UpBoxComponent } from './UpBox';
import { getRootContainer } from '../../../Common/stories';

export default {
    title: 'Components/Containers/UpBox',
    decorators: [
        withKnobs,
        getRootContainer('UpBox')
    ],
    component: UpBoxComponent,
};

export const Center =
    () => (
        <UpBox
            flexDirection={'row'}
            justifyContent={'center'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
        >
            <p>Alignement des élément au centre</p>
        </UpBox>

    );

export const AddMarginAsObjectToTheBox =
    () => (
        <UpBox
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
            margin={{ horizontal: 'none', vertical: 'xlarge' }}
        >
            <p>Texte sélectionnable</p>
        </UpBox>

    );

export const UnselectableText =
    () => (
        <UpBox
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
            selectable={'none'}
        >
            <p>Texte non sélectionnable</p>
        </UpBox>

    );

export const FlexEnd =
    () => (
        <UpBox
            alignItems={'flex-end'}
            flexDirection={'column'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
        >
            <p>Alignement des élément flex-end : position 1 </p>
            <p>Alignement des élément flex-end : position 2 </p>
            <p>Alignement des élément flex-end : position 3 </p>
        </UpBox>
    );

export const FlexStart =
    () => (
        <UpBox
            alignItems={'flex-start'}
            flexDirection={'column'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
        >
            <p>Alignement des élément flex-start : position 1 </p>
            <p>Alignement des élément flex-start : position 2 </p>
            <p>Alignement des élément flex-start : position 3 </p>
        </UpBox>

    );

export const RowReverseAndSpaceBetweenOnHorizontalAxis =
    () => (
        <UpBox
            flexDirection={'row-reverse'}
            justifyContent={'space-between'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'large'}
        >
            <p> Alignement des élément row-reverse : position 1 </p>
            <p> Alignement des élément row-reverse : position 2 </p>
            <p> Alignement des élément row-reverse : position 3</p>
        </UpBox>
    );

export const StretchAndSpaceBetweenOnHorizontalAxis =
    () => (
        <UpBox
            flexDirection={'row'}
            alignItems={'stretch'}
            justifyContent={'space-between'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
            margin={'none'}
            style={{ height: 200 }}
        >
            <p style={{ backgroundColor: 'gold', width: '30%' }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'tomato', width: '30%' }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'lightgreen', width: '30%' }}>Alignement des élément </p>
        </UpBox>
    );

export const flexCenterAndSpaceAround =
    () => (
        <UpBox
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-around'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
            margin={'none'}
            style={{ height: 200 }}
        >
            <p style={{ backgroundColor: 'gold', width: '30%', height: 100 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'tomato', width: '30%', height: 150 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'lightgreen', width: '30%', height: 50 }}>Alignement des élément </p>
        </UpBox>
    );

export const flexWrap =
    () => (
        <UpBox
            flexDirection={'row'}
            flexWrap={true}
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
            style={{ height: 150 }}
        >
            <p style={{ backgroundColor: 'gold', width: '30%', height: 50 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'tomato', width: '30%', height: 50 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'lightgreen', width: '30%', height: 50 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'coral', width: '30%', height: 50 }}>Alignement des élément </p>
        </UpBox>
    );

export const flexNoWrap =
    () => (
        <UpBox
            flexDirection={'row'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'small'}
            style={{ height: 150 }}
        >
            <p style={{ backgroundColor: 'gold', width: '30%', height: 50 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'tomato', width: '30%', height: 50 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'lightgreen', width: '30%', height: 50 }}>Alignement des élément </p>
            <p style={{ backgroundColor: 'coral', width: '30%', height: 50 }}>Alignement des élément </p>
        </UpBox>
    );

export const BoxFullSize =
    () => (
        <div style={{ overflow: 'hidden' }}>
            <UpBox
                full={true}
                backgroundColor={'#369'}
                color={'white'}
                pad={'medium'}
            >
                <p>Elément </p>
            </UpBox>
        </div>
    );

export const customedBoxSize =
    () => (
        <UpBox
            boxSize={'small'}
            backgroundColor={'#369'}
            color={'white'}
            pad={'medium'}
        >
            <p>Elément </p>
        </UpBox>
    );

export const customedBoxSizeWithSpecificHorizontalAndVerticalMeasures =
    () => (
        <UpBox
            boxSize={{ horizontal: "xlarge", vertical: "xlarge" }}
            backgroundColor={'#369'}
            color={'white'}
            pad={'medium'}
        >
            <p>Elément </p>
        </UpBox>
    );