import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { useState } from 'react';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import { MultiLineInputBox } from '../../components/inputBox/Input';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { BasicButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';

const Container = styled.View`
  margin-left: ${20 * widthPercent};
  margin-right: ${20 * widthPercent};
  margin-bottom: ${20 * heightPercent};
  row-gap: ${5 * heightPercent};
`;

const CreatePostScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '자유', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '꿀팁', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '나눔', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '질문', event: () => setActiveIndex(3), active: activeIndex === 3 },
  ];
  const [Urls, setUrls] = useState<string[]>([]);
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type={'default'} firstIcon='back' title={'게시글 등록'} onPressMore={() => console.log('더보기')} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY4_M>분류 선택</Typo.BODY4_M>
          <View style={{ alignItems: 'center' }}>
            <CustomRadioButton data={Data} width={60} />
          </View>
        </Container>
        <Container>
          <Typo.BODY4_M>내용</Typo.BODY4_M>
          <MultiLineInputBox placeholder={'내용을 작성하세요'} />
        </Container>
        <Container>
          <Typo.BODY4_M>사진</Typo.BODY4_M>
          <ImgUploader data={Urls} setData={setUrls}></ImgUploader>
        </Container>
      </ScrollView>
      <Container>
        <BasicButton borderColor={Color.GREEN500} borderRadius={10} height={45} onPress={() => console.log('작성완료')} width={300}>
          <Typo.BODY3_M color={Color.WHITE}>작성완료</Typo.BODY3_M>
        </BasicButton>
      </Container>
    </View>
  );
};

export default CreatePostScreen;