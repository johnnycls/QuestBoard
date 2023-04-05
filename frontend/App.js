import "react-native-gesture-handler";
import React from "react";
import * as eva from "@eva-design/eva";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import Routes from "./src/app/Routes";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as mapping } from "./src/mapping.json";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default () => {
  const [fontsLoaded, setFontsLoded] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoded(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
        <StatusBar style="auto" />
        <View
          onLayout={onLayoutRootView}
          style={{ width: "100%", height: "100%" }}
        >
          <Routes />
        </View>
      </ApplicationProvider>
    </Provider>
  );
};
