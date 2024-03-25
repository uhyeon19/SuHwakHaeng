import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Color from '../../config/color/Color';
import * as Typo from '../typography/Typography';
import styled from 'styled-components/native';
import { BasicButton } from '../button/Buttons';
import Plus from '../../../assets/icons/plus.svg';
import { Spacer } from '../basic/Spacer';
import { widthPercent } from '../../config/dimension/Dimension';
import BellPepper from '../../../assets/icons/bellPepper.svg';
import Carrot from '../../../assets/icons/carrot.svg';
import ChiliPepper from '../../../assets/icons/chiliPepper.svg';
import Cucumber from '../../../assets/icons/cucumber.svg';
import Eggplant from '../../../assets/icons/eggplant.svg';
import Garlic from '../../../assets/icons/garlic.svg';
import GreenOnion from '../../../assets/icons/greenOnion.svg';
import Lettuce from '../../../assets/icons/lettuce.svg';
import Onion from '../../../assets/icons/onion.svg';
import Potato from '../../../assets/icons/potato.svg';
import Pumpkin from '../../../assets/icons/pumpkin.svg';
import SweetPotato from '../../../assets/icons/sweetPotato.svg';
import Tomato from '../../../assets/icons/tomato.svg';
import Watermelon from '../../../assets/icons/watermelon.svg';

const StyledView = styled.View`
  width: ${widthPercent * 24}px;
  height: ${widthPercent * 24}px;
  background-color: ${Color.GRAY200};
  border-radius: ${widthPercent * 50}px;
  border-color: ${Color.GRAY200};
  align-items: center;
  justify-content: center;
`;

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PlantAdd = () => {
  return (
    <TouchableOpacity>
      <RowView>
        <BasicButton
          onPress={() => console.log('Button pressed')}
          width={widthPercent * 24}
          height={widthPercent * 24}
          disabled={false}
          backgroundColor={Color.GRAY200}
          borderRadius={50}
          borderColor={Color.GRAY200}
        >
          <Plus />
        </BasicButton>
        <Spacer space={widthPercent * 10} horizontal />
        <Typo.BODY4_M color={Color.GRAY200}>작물 추가</Typo.BODY4_M>
      </RowView>
    </TouchableOpacity>
  );
};

type PlantAddProps = {
  onPress: () => void;
  width?: number;
  height?: number;
  svgWidth?: number;
  svgHeight?: number;
  backgroundColor?: string;
  borderColor?: string;
  children?: React.ReactNode;
  name?: string;
  location?: string;
};

export const PlantItem = (props: PlantAddProps) => {
  const plantData: { [key: string]: any } = {
    '가지': Eggplant,
    '고구마': SweetPotato,
    '고추': ChiliPepper,
    '감자': Potato,
    '당근': Carrot,
    '마늘': Garlic,
    '상추': Lettuce,
    '수박': Watermelon,
    '양파': Onion,
    '오이': Cucumber,
    '파': GreenOnion,
    '파프리카': BellPepper,
    '토마토': Tomato,
    '호박': Pumpkin,
  };

  const PlantIcon = plantData[ props.name || '']; // props로 전달된 작물 이름에 해당하는 아이콘을 가져옴

  return (
    <TouchableOpacity onPress={props.onPress}>
      <RowView>        
        <StyledView>
          {PlantIcon && <PlantIcon width={widthPercent * 16} height={widthPercent * 16} />}
        </StyledView>
        <Spacer space={widthPercent * 10} horizontal />
        <Typo.BODY4_M >{props.name}</Typo.BODY4_M>
        <Spacer space={widthPercent * 10} horizontal />
        <Typo.Detail1_M color={Color.GRAY400}>{props.location}</Typo.Detail1_M>
      </RowView>
    </TouchableOpacity>
  );
};
