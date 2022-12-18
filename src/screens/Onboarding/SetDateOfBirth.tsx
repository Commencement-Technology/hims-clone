import { StyleSheet, View } from "react-native";
import React, { useState, useRef } from "react";
import BaseTextInput from "../../components/TextInput/BaseTextInput";
import Button from "../../components/Button";
import Color from "../../constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../types/Navigation";
import Divider from "../../components/Dividers";
import BaseText from "../../components/Text";

type Props = NativeStackScreenProps<OnboardingStackParamList, "SetDateOfBirth">;
const maxYear = new Date().getFullYear() - 18;
const _helperText = "Must be up to 18 years old";

const SetState = ({ navigation }: Props) => {
  const [DOB, setDOB] = useState("12");
  const [errorText, setErrorText] = useState("");
  const displayedText = DOB.replace(/ |[\D]|/g, "").replace(
    /([\d]{2})-?([\d]{1,2})?-?([\d]{1,4})?/g,
    (_, p1, p2, p3) => {
      const errorText =
        parseInt(p1) > 12
          ? "Invalid month"
          : parseInt(p2) > 31
          ? "Invalid day"
          : parseInt(p3) > maxYear
          ? "Invalid Year"
          : "";
      // this is to avoid infinite rerender
      setTimeout(() => {
        setErrorText(errorText);
      }, 0);
      // This allows the code to match dates of birth in the format dd, dd-mm, or dd-mm-yyyy.
      return `${p1}${p2 ? `-${p2}` : ""}${p3 ? `-${p3}` : ""}`;
    }
  );

  // Text format is correct when displayed text text is not empty and matches the format of MM-DD-YYYY or when the text input is empty
  const isTextFormatCorrect =
    (Boolean(displayedText.match(/[\d]{2}-[\d]{2}-[\d]{4}/g)) &&
      displayedText.length > 0) ||
    displayedText.length === 0;
  const isError = !isTextFormatCorrect || Boolean(errorText);

  const handleButtonClick = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={{ padding: 20 }}>
      <BaseText size="h1">When were you born?</BaseText>
      <Divider size="l" />
      <BaseTextInput
        value={displayedText}
        onChangeText={setDOB}
        isError={isError}
        placeholder="Date of Birth (MM-DD-YYYY)"
        keyboardType="number-pad"
        helperText={errorText || _helperText}
        maxLength={10}
      />
      <Divider size="l" />
      <Button
        onPress={handleButtonClick}
        label="Next"
        color={Color.black}
        style={{ text: { color: Color.white } }}
      />
    </View>
  );
};

export default SetState;
