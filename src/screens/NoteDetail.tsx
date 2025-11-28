// screens/NoteDetail.tsx
import { auth, db } from "@/src/config/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function NoteDetail() {
	const navigation = useNavigation();
	const route = useRoute();
	const noteId = (route.params as any).noteId;

	const [note, setNote] = useState<any>(null);

	useEffect(() => {
		const fetch = async () => {
			const snap = await getDoc(
				doc(db, "users", auth.currentUser!.uid, "notes", noteId)
			);
			if (snap.exists()) setNote({ id: snap.id, ...snap.data() });
		};
		fetch();
	}, [noteId]);

	if (!note) return null;

	return (
		<View style={[styles.container, { backgroundColor: note.color || "#fff" }]}>
			<TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
				<ArrowLeft color="#000" size={28} />
			</TouchableOpacity>

			<ScrollView style={styles.content}>
				<Text style={styles.title}>{note.title || "Tanpa Judul"}</Text>
				<Text style={styles.body}>{note.content}</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	back: { padding: 20 },
	content: { paddingHorizontal: 20 },
	title: { fontSize: 32, fontWeight: "bold", marginBottom: 20, color: "#000" },
	body: { fontSize: 18, lineHeight: 28, color: "#000" },
});
