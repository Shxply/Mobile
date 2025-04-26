import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Markdown from 'react-native-markdown-display';
import { ScrollView } from 'react-native';


import CompareScreenStyles from '../styles/CompareScreenStyles';
import ProductCard from '../components/ProductCard';
import { Product } from '@/types/Product';
import { fetchProductByBarcode, compareProductsWithAI } from '@/services/HomeService';

export default function CompareScreen() {
  const [productA, setProductA] = useState<Product | null>(null);
  const [productB, setProductB] = useState<Product | null>(null);
  const [scanningFor, setScanningFor] = useState<'A' | 'B' | null>(null);
  const [scanned, setScanned] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const scanLockRef = useRef(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    const compareWithAI = async (a: Product, b: Product) => {
      setIsComparing(true);
      setComparisonResult(null);

      try {
        const result = await compareProductsWithAI(a, b);
        if (!result) throw new Error('No AI comparison result returned.');
        setComparisonResult(result);
      } catch (err) {
        console.error('❌ Failed AI comparison:', err);
        setComparisonResult('⚠️ Failed to retrieve AI comparison.');
      } finally {
        setIsComparing(false);
      }
    };

    if (productA && productB) {
      compareWithAI(productA, productB);
    } else {
      setComparisonResult(null);
    }
  }, [productA, productB]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanLockRef.current) {
      console.log('🚫 Duplicate scan ignored');
      return;
    }

    scanLockRef.current = true;
    setScanned(true);
    console.log('📦 Scanned barcode:', data);

    try {
      const product = await fetchProductByBarcode(data);
      if (!product) {
        Alert.alert('Product Not Found', 'No product data returned for this barcode.');
      } else {
        if (scanningFor === 'A') setProductA(product);
        if (scanningFor === 'B') setProductB(product);
      }
    } catch (error) {
      console.error('❌ Error fetching product:', error);
      Alert.alert('Error', 'Failed to fetch product.');
    } finally {
      setScanningFor(null);

      setTimeout(() => {
        scanLockRef.current = false;
        setScanned(false);
        console.log('🔓 Scan ready again');
      }, 2000);
    }
  };

  const handleReset = () => {
    setProductA(null);
    setProductB(null);
    setComparisonResult(null);
    setScanningFor(null);
    setScanned(false);
    scanLockRef.current = false;
  };

  const renderCard = (product: Product | null, label: 'A' | 'B') => {
    const isScanningThis = scanningFor === label;

    if (isScanningThis) {
      if (!permission) {
        return (
          <View style={CompareScreenStyles.card}>
            <Text>Checking camera permissions...</Text>
          </View>
        );
      }

      if (permission.status !== 'granted') {
        return (
          <View style={CompareScreenStyles.card}>
            <Text style={{ marginBottom: 10 }}>Camera access is required.</Text>
            <TouchableOpacity
              onPress={async () => {
                const result = await requestPermission();
                if (result.granted) {
                  setScanningFor(label);
                } else {
                  Alert.alert('Permission Denied', 'Camera access was not granted.');
                }
              }}
              style={CompareScreenStyles.rescanBtn}
            >
              <Text style={CompareScreenStyles.rescanText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={CompareScreenStyles.cameraCard}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39', 'qr', 'itf14', 'pdf417'],
            }}            
          />
          {scanned && (
            <TouchableOpacity
              style={CompareScreenStyles.scanAgainButton}
              onPress={() => {
                scanLockRef.current = false;
                setScanned(false);
              }}
            >
              <Text style={CompareScreenStyles.scanAgainText}>Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return product ? (
      <ProductCard product={product} />
    ) : (
      <TouchableOpacity
        style={CompareScreenStyles.card}
        onPress={() => {
          setScanningFor(label);
          setScanned(false);
        }}
        activeOpacity={0.8}
      >
        <View style={CompareScreenStyles.placeholderCard}>
          <Text style={CompareScreenStyles.scanText}>
            {label === 'A' ? 'Tap to scan first product' : 'Tap to scan second product'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAIComparisonCard = () => (
    <View style={CompareScreenStyles.resultCard}>
      <Text style={CompareScreenStyles.resultHeader}>AI Comparison</Text>
      {isComparing ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : comparisonResult ? (
        <Markdown style={{ body: CompareScreenStyles.resultText }}>
          {comparisonResult}
        </Markdown>
      ) : (
        <Text style={[CompareScreenStyles.resultText, { opacity: 0.6 }]}>
          Scan both products to compare.
        </Text>
      )}
    </View>
  );
  

  const renderResetButton = () => (
    <TouchableOpacity
      style={CompareScreenStyles.resetButton}
      onPress={handleReset}
      activeOpacity={0.8}
    >
      <Text style={CompareScreenStyles.resetButtonText}>Reset</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={CompareScreenStyles.container}>
      {renderCard(productA, 'A')}
      {renderCard(productB, 'B')}
      {renderAIComparisonCard()}
      {(productA || productB || comparisonResult) && renderResetButton()}
    </ScrollView>
  );  
}

