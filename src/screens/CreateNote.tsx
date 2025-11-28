// screens/CreateNote.tsx (VERSI ANTI-DUPLIKAT & ANTI-SPAM)

import { auth, db } from "@/src/config/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const COLORS = [
	"#F472B6",
	"#FB923C",
	"#FBBF24",
	"#34D399",
	"#60A5FA",
	"#A78BFA",
	"#F87171",
	"#e0e0e0",
];

export default function CreateNote() {
	const navigation = useNavigation();
	const route = useRoute();
	const noteId = (route.params as any)?.noteId;

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false); // ← INI YANG PENTING!
	const [initialColor] = useState(
		noteId ? undefined : COLORS[Math.floor(Math.random() * COLORS.length)]
	);

	// Jika edit → ambil data
	useEffect(() => {
		if (noteId) {
			const fetchNote = async () => {
				const snap = await getDoc(
					doc(db, "users", auth.currentUser!.uid, "notes", noteId)
				);
				if (snap.exists()) {
					const data = snap.data();
					setTitle(data.title || "");
					setContent(data.content || "");
				}
			};
			fetchNote();
		}
	}, [noteId]);

	const saveNote = async () => {
		if (loading) return;

		if (!title.trim() && !content.trim()) {
			Alert.alert("Kosong", "Tulis sesuatu dulu ya");
			return;
		}

		setLoading(true);

		try {
			const clientTs = Date.now();

			if (noteId) {
				(navigation as any).navigate("Home", {
					pendingOp: {
						type: "update",
						noteId,
						title: title.trim(),
						content: content.trim(),
						clientUpdatedAt: clientTs,
					},
				});

				await updateDoc(
					doc(db, "users", auth.currentUser!.uid, "notes", noteId),
					{
						title: title.trim(),
						content: content.trim(),
						clientUpdatedAt: clientTs,
						updatedAt: serverTimestamp(),
					}
				);
			} else {
				(navigation as any).navigate("Home", {
					pendingOp: {
						type: "create",
						title: title.trim(),
						content: content.trim(),
						color: initialColor,
						clientCreatedAt: clientTs,
					},
				});

				await addDoc(collection(db, "users", auth.currentUser!.uid, "notes"), {
					title: title.trim(),
					content: content.trim(),
					color: initialColor,
					clientCreatedAt: clientTs,
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp(),
				});
			}
		} catch (error) {
			Alert.alert("Error", "Gagal menyimpan. Coba lagi.");
			console.error(error);
		}
	};

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: noteId ? "#fff" : initialColor },
			]}
		>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					disabled={loading}
				>
					<ArrowLeft color="#000" size={28} />
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
					onPress={saveNote}
					disabled={loading} // ← Disable saat loading
				>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.saveText}>Simpan</Text>
					)}
				</TouchableOpacity>
			</View>

			<TextInput
				placeholder="Judul"
				value={title}
				onChangeText={setTitle}
				style={styles.titleInput}
				placeholderTextColor="#888"
				editable={!loading}
			/>

			<TextInput
				placeholder="Tuliskan catatanmu..."
				value={content}
				onChangeText={setContent}
				multiline
				style={styles.contentInput}
				placeholderTextColor="#888"
				editable={!loading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	saveBtn: {
		backgroundColor: "#000",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 12,
	},
	saveBtnDisabled: {
		backgroundColor: "#666",
	},
	saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
	titleInput: {
		fontSize: 28,
		fontWeight: "bold",
		paddingHorizontal: 20,
		color: "#000",
	},
	contentInput: {
		flex: 1,
		fontSize: 17,
		paddingHorizontal: 20,
		textAlignVertical: "top",
		color: "#000",
		marginTop: 10,
	},
});
