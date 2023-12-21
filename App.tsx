/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  getBalances, type SafeBalanceResponse,
  type TokenInfo
} from '@safe-global/safe-gateway-typescript-sdk';

function App(): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [balances, setBalances] = useState<{ tokenInfo: TokenInfo; balance: string; fiatBalance: string; fiatConversion: string; }[]>([]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect( () => {
    async function fetchData() {
      try {
        const response = await getBalances('1', '0x84443F61efc60D10DA9F9a2398980CD5748394BB', 'usd');
        setBalances(response.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList 
            data={balances}
            keyExtractor={(item) => item.tokenInfo.address }
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 24, height: 24}}
                  source={{uri: item.tokenInfo.logoUri}}
                />
                <Text style={{padding: 8}}>
                  {item.tokenInfo.symbol}: {item.balance} ({item.fiatBalance} USD)
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
