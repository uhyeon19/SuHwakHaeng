import React, { useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { DropDown } from '../../components/dropdown/DropDown';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { createDiary } from '../../apis/farm/farm';
import DatePicker from 'react-native-date-picker';
import { Button, View } from 'react-native';

type RootStackParamList = {
  FarmScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Color.WHITE};
  position: relative;
`;

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const FormItemContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;
const StyledButton = styled.TouchableOpacity`
  height: ${heightPercent * 36}px;
  width: '100%';
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding: ${widthPercent * 10}px;
  margin: ${heightPercent * 10}px 0px;
  font-family: 'GmarketSansTTFMedium';
  font-size: ${widthPercent * 12}px;
`;

const FarmDairyAddScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [choose, setChoose] = useState(false);
  const [urls, setUrls] = useState([]);
  const [dataList, setDataList] = useState('');
  const crops = ['서울', '경기', '인천', '강원', '충청', '경상', '전라', '제주'];

  const onPressButton = () => {
    const fetchData = async () => {
      const params = {};
      await createDiary();
    };

    fetchData();
    // TODO: 작성 완료 후 상세보기 페이지로 이동?
    console.log('작성 완료');
    navigation.navigate('FarmScreen');
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year} ${month} ${day}`;
  };

  return (
    <Container>
      <Header type='default' firstIcon='back' title='영농 일지' />
      <FormContainer>
        <FormItemContainer>
          <Typo.BODY4_M>작물</Typo.BODY4_M>
          <DropDown
            dataList={crops} // 드롭다운 목록에 표시할 항목들의 배열
            onSelect={(selectedItem: any) => setDataList(selectedItem)} // 사용자가 항목을 선택했을 때 실행될 콜백 함수
            defaultText='작물 선택' // 드롭다운 버튼에 표시될 기본 텍스트
          />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>날짜</Typo.BODY4_M>

          <StyledButton
            onPress={() => {
              setOpen(true);
            }}
          >
            { choose === true ? <Typo.BODY4_M color={Color.GRAY400}>{formatDate(date)}</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY400}>날짜 선택</Typo.BODY4_M> }
          </StyledButton>

          <DatePicker
            mode='date'
            modal
            open={open}
            date={date}
            onConfirm={(chooseDate) => {
              setOpen(false);
              setChoose(true);
              setDate(chooseDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>영농작업</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'작업내용을 입력해주세요(ex 씨뿌림)'}></SingleLineInputBox>
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>한줄 메모(선택)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'내용을 작성해주세요'}></SingleLineInputBox>
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>사진 (선택)</Typo.BODY4_M>
          <ImgUploader data={urls} setData={setUrls}></ImgUploader>
        </FormItemContainer>
        <ButtonContainer>
          <BasicButton onPress={onPressButton} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
            <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
          </BasicButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default FarmDairyAddScreen;
