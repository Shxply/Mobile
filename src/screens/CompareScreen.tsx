import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import CompareScreenStyles from '../styles/CompareScreenStyles';
import ProductCard from '../components/ProductCard';
import { Product } from '@/types/Product';
import { fetchProductByBarcode } from '@/services/ProductService';

export default function CompareScreen() {
  const [productA, setProductA] = useState<Product | null>(null);
  const [productB, setProductB] = useState<Product | null>(null);
  const [scanningFor, setScanningFor] = useState<'A' | 'B' | null>(null);
  const [scanned, setScanned] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  useEffect(() => {
    const compareProductsWithAI = async (a: Product, b: Product) => {
      setIsComparing(true);
      setComparisonResult(null);
      // Simulate delay like an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockOutput = `AI Comparison:\n"${a.name}" is more affordable, but "${b.name}" has higher nutritional value. It depends on your priority.`;
      setComparisonResult(mockOutput);
      setIsComparing(false);
    };

    if (productA && productB) {
      compareProductsWithAI(productA, productB);
    } else {
      setComparisonResult(null);
    }
  }, [productA, productB]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    try {
      const product = await fetchProductByBarcode(data);
      if (!product) throw new Error('Product not found');
      if (scanningFor === 'A') setProductA(product);
      if (scanningFor === 'B') setProductB(product);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch product.');
    } finally {
      setScanningFor(null);
    }
  };

  const renderCard = (product: Product | null, label: 'A' | 'B') => {
    if (scanningFor === label) {
      if (!permission) {
        return (
          <View style={CompareScreenStyles.card}>
            <Text>Requesting camera permission...</Text>
          </View>
        );
      }

      if (!permission.granted) {
        return (
          <View style={CompareScreenStyles.card}>
            <Text style={{ marginBottom: 10 }}>Camera permission is required.</Text>
            <TouchableOpacity onPress={requestPermission} style={CompareScreenStyles.rescanBtn}>
              <Text style={CompareScreenStyles.rescanText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={CompareScreenStyles.card}>
          <CameraView
            style={{ flex: 1, width: '100%' }}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13', 'upc_a', 'upc_e', 'ean8'],
            }}
          />
          {scanned && (
            <TouchableOpacity
              style={CompareScreenStyles.rescanBtn}
              onPress={() => setScanned(false)}
            >
              <Text style={CompareScreenStyles.rescanText}>Scan Again</Text>
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
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40, marginBottom: 8 }}>📷</Text>
          <Text style={CompareScreenStyles.scanText}>Tap to scan Product {label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAIComparisonCard = () => {
    return (
      <View style={CompareScreenStyles.resultCard}>
        <Text style={CompareScreenStyles.resultHeader}>AI Comparison</Text>
        {isComparing ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : comparisonResult ? (
          <Text style={CompareScreenStyles.resultText}>{comparisonResult}</Text>
        ) : (
          <Text style={[CompareScreenStyles.resultText, { opacity: 0.6 }]}>
            Scan both products to compare.
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={CompareScreenStyles.container}>
      {renderCard(productA, 'A')}
      {renderCard(productB, 'B')}
      {renderAIComparisonCard()}
    </View>
  );
}



