import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { fetchProductByBarcode } from '@/services/HomeService';
import { fetchNearbyStores, trackBarcodeScan } from '@/services/ScanService';
import { Product } from '@/types/Product';
import { Store } from '@/types/Store';
import ScanScreenStyles from '../styles/ScanScreenStyles';
import { getUserIdFromToken } from '@/utils/DecodeToken';
import { useAuth } from '@/context/AuthContext';
import { Menu } from 'react-native-paper';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [storeId, setStoreId] = useState('');
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [nearbyStores, setNearbyStores] = useState<Store[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const { token } = useAuth();
  const scanLockRef = useRef(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanLockRef.current) return;

    scanLockRef.current = true;
    setScanned(true);

    try {
      const fetchedProduct = await fetchProductByBarcode(data);
      if (!fetchedProduct) {
        Alert.alert('New Product', 'No product found. Please add details.');
        setProduct({ barcode: data } as Product);
      } else {
        setProduct(fetchedProduct);
      }

      const locPermission = await Location.requestForegroundPermissionsAsync();
      if (locPermission.status !== 'granted') {
        console.warn('📍 Location permission denied');
        return;
      }

      const coords = await Location.getCurrentPositionAsync({});
      const stores = await fetchNearbyStores(coords.coords.latitude, coords.coords.longitude);
      if (stores) setNearbyStores(stores);
    } catch (error) {
      console.error('❌ Scan or Location Error:', error);
      Alert.alert('Error', 'Failed to fetch product or location.');
    } finally {
      setTimeout(() => {
        scanLockRef.current = false;
      }, 2000);
    }
  };

  const handleSubmit = async () => {
    if (!product || !storeId || !price) {
      Alert.alert('Missing Info', 'Please fill out all fields.');
      return;
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      Alert.alert('Auth Error', 'Could not identify user.');
      return;
    }

    setSubmitting(true);
    try {
      const success = await trackBarcodeScan(
        userId,
        storeId,
        product.productId || product.barcode,
        parseFloat(price)
      );
      if (success) {
        Alert.alert('Success', 'Scan and price saved.');
        setProduct(null);
        setStoreId('');
        setPrice('');
        setScanned(false);
        setNearbyStores([]);
      } else {
        throw new Error('Server rejected request');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save scan.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={ScanScreenStyles.container}>
      {!product ? (
        <CameraView
          style={ScanScreenStyles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              'ean13',
              'ean8',
              'upc_a',
              'upc_e',
              'code128',
              'code39',
              'qr',
              'itf14',
              'pdf417'
            ]
          }}
        />
      ) : (
        <View style={ScanScreenStyles.formContainer}>
          <Text style={ScanScreenStyles.label}>Product: {product.name || product.barcode}</Text>

          <Text style={ScanScreenStyles.label}>Select a Store:</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                style={ScanScreenStyles.dropdownTrigger}
              >
                <Text style={ScanScreenStyles.dropdownText}>
                  {storeId
                    ? nearbyStores.find((s) => s.storeId === storeId)?.name || 'Select Store'
                    : 'Select Store'}
                </Text>
              </TouchableOpacity>
            }
          >
            {nearbyStores.map((store) => {
              // Extract city from vicinity
              const city = store.vicinity?.split(',').slice(-1)[0].trim() || 'Unknown City';
              
              return (
                <Menu.Item
                  key={store.storeId}
                  onPress={() => {
                    setStoreId(store.storeId);
                    setMenuVisible(false);
                  }}
                  title={`${store.name} (${city})${store.rating ? ` ⭐ ${store.rating}` : ''}`}
                />
              );
            })}
          </Menu>

          <TextInput
            placeholder="Enter Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            style={ScanScreenStyles.input}
          />
          <TouchableOpacity
            style={ScanScreenStyles.submitButton}
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text style={ScanScreenStyles.submitButtonText}>
              {submitting ? 'Saving...' : 'Save Product'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
