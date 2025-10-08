import {
	CameraRoll,
	PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll";
import React, { useState } from "react";
import {
	Alert,
	Button,
	FlatList,
	Image,
	PermissionsAndroid,
	Platform,
	StyleSheet,
	View,
} from "react-native";

interface Photo {
	uri: string;
	id: number;
}

export default function AndroidGalleryScreen() {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// 1. Fungsi untuk meminta izin KHUSUS Android
	const hasAndroidPermission = async () => {
		if (Platform.OS === "android") {
			const permission =
				PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

			const hasPermission = await PermissionsAndroid.check(permission);
			if (hasPermission) {
				return true;
			}

			const status = await PermissionsAndroid.request(permission);
			return status === "granted";
		}
		// Jika bukan Android, asumsikan izin sudah diberikan (diurus oleh sistem iOS/lainnya)
		return true;
	};

	// 2. Fungsi untuk memuat foto
	const loadPhotos = async () => {
		setIsLoading(true);

		// Cek izin hanya untuk Android
		if (!(await hasAndroidPermission())) {
			Alert.alert(
				"Izin Diperlukan",
				"Kami membutuhkan izin untuk membaca galeri Anda."
			);
			setIsLoading(false);
			return;
		}

		try {
			// Menggunakan CameraRoll.getPhotos
			const result = await CameraRoll.getPhotos({
				first: 10, // Batasi hingga 10 foto
				assetType: "Photos", // Hanya ambil foto
				// Untuk sorting, CameraRoll memiliki opsi terbatas, biasanya sudah terurut berdasarkan waktu.
			});

			// Simpan URI foto ke state
			if (result.edges.length > 0) {
				// Ambil path URI dari node
				setPhotos(
					result.edges.map((edge: PhotoIdentifier) => ({
						uri: edge.node.image.uri,
						id: edge.node.timestamp,
					}))
				);
			} else {
				Alert.alert("Info", "Tidak ditemukan foto di galeri Anda.");
			}
		} catch (error) {
			console.error("Gagal memuat foto:", error);
			Alert.alert("Error", "Gagal memuat foto dari galeri.");
		} finally {
			setIsLoading(false);
		}
	};

	const renderItem = ({ item }: { item: Photo }) => (
		<Image source={{ uri: item.uri }} style={styles.image} />
	);

	return (
		<View style={styles.container}>
			<Button
				title={isLoading ? "Memuat..." : "Tampilkan 10 Foto Galeri (Android)"}
				onPress={loadPhotos}
				disabled={isLoading}
			/>

			<FlatList
				data={photos}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				style={styles.list}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 10,
		backgroundColor: "#fff",
	},
	list: {
		marginTop: 10,
	},
	image: {
		width: "33.33%",
		height: 120,
		aspectRatio: 1,
		margin: 1,
	},
});
