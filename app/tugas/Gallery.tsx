import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Button,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";

// Definisikan tipe untuk aset gambar agar lebih aman (Meskipun MediaLibrary.Asset sudah tersedia)
type GalleryAsset = MediaLibrary.Asset;

export default function App() {
	// Gunakan tipe GalleryAsset[] untuk state images
	const [images, setImages] = useState<GalleryAsset[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// usePermissions() mengembalikan array yang sudah di-typed dengan benar
	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

	const getGalleryImages = async () => {
		setIsLoading(true);

		// 1. Cek dan Minta Izin
		let finalStatus = permissionResponse;

		if (finalStatus?.status !== "granted") {
			// requestPermission() akan meminta izin
			const response = await requestPermission();
			finalStatus = response;
		}

		if (finalStatus?.status !== "granted") {
			Alert.alert(
				"Izin Ditolak",
				"Akses ke galeri diperlukan untuk menampilkan gambar."
			);
			setIsLoading(false);
			return;
		}

		// 2. Ambil Aset Gambar
		try {
			// PagedInfo<GalleryAsset> adalah tipe yang dikembalikan
			const assetsPage = await MediaLibrary.getAssetsAsync({
				first: 10,
				mediaType: [MediaLibrary.MediaType.photo],
				sortBy: [MediaLibrary.SortBy.creationTime],
			});

			// assetsPage.assets adalah array dari GalleryAsset (MediaLibrary.Asset)
			setImages(assetsPage.assets);
		} catch (error) {
			console.error("Gagal mengambil gambar: ", error);
			Alert.alert("Error", "Gagal mengambil gambar dari galeri.");
		} finally {
			setIsLoading(false);
		}
	};

	// Fungsi untuk merender setiap item gambar
	// Definisikan tipe untuk parameter FlatList renderItem
	const renderItem = ({ item }: { item: GalleryAsset }) => (
		<View style={styles.imageContainer}>
			<Image source={{ uri: item.uri }} style={styles.image} />
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tugas Pemrograman Mobile (TSX)</Text>

			<Button
				title={isLoading ? "Memuat..." : "Tampilkan 10 Gambar Galeri"}
				onPress={getGalleryImages}
				disabled={isLoading || !permissionResponse}
			/>

			{isLoading && (
				<ActivityIndicator
					size="large"
					color="#0000ff"
					style={{ marginTop: 20 }}
				/>
			)}

			<FlatList
				data={images}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				numColumns={3}
				style={styles.list}
			/>

			{images.length === 0 && !isLoading && (
				<Text style={styles.infoText}>
					Tekan tombol di atas untuk memuat gambar dari galeri.
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		alignItems: "center",
		backgroundColor: "#f0f0f0",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	list: {
		marginTop: 20,
		width: "100%",
	},
	imageContainer: {
		flex: 1,
		margin: 2,
		aspectRatio: 1,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	infoText: {
		marginTop: 20,
		color: "#666",
		textAlign: "center",
	},
});
