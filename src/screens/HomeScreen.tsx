// screens/HomeScreen.tsx
import { auth, db } from "@/src/config/firebase";
import type { RootStackParamList } from "@/src/types/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { LogOut, Pencil, Plus, Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Snackbar } from "react-native-paper";

import { signOut } from "firebase/auth";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

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

export default function HomeScreen() {
	const navigation = useNavigation<NavProp>();
	const route = useRoute();
	const [notes, setNotes] = useState<DocumentData[]>([]);
	const [loading, setLoading] = useState(true);
	const [snackbar, setSnackbar] = useState<{
		visible: boolean;
		message: string;
		actionLabel?: string;
		action?: () => void;
	}>({ visible: false, message: "" });
	const [pendingOp, setPendingOp] = useState<any | null>(null);
	const [pendingTimer, setPendingTimer] = useState<any>(null);

	useEffect(() => {
		if (!auth.currentUser) {
			setNotes([]);
			setLoading(false);
			return;
		}

		const q = query(
			collection(db, "users", auth.currentUser.uid, "notes"),
			orderBy("clientCreatedAt", "desc")
		);

		const timeout = setTimeout(() => setLoading(false), 1500);

		const unsub = onSnapshot(
			q,
			(snap) => {
				const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
				setNotes(data);
				setLoading(false);
				clearTimeout(timeout);
				if (pendingOp) {
					if (
						pendingOp.type === "create" &&
						data.some((d) => d.clientCreatedAt === pendingOp.clientCreatedAt)
					) {
						setSnackbar({ visible: true, message: "Note created" });
						setPendingOp(null);
						if (pendingTimer) clearTimeout(pendingTimer);
						setPendingTimer(null);
					} else if (
						pendingOp.type === "update" &&
						data.some(
							(d) =>
								d.id === pendingOp.noteId &&
								d.clientUpdatedAt === pendingOp.clientUpdatedAt
						)
					) {
						setSnackbar({ visible: true, message: "Note updated" });
						setPendingOp(null);
						if (pendingTimer) clearTimeout(pendingTimer);
						setPendingTimer(null);
					}
				}
			},
			(err) => {
				console.error("Firestore subscribe error:", err);
				setLoading(false);
				clearTimeout(timeout);
				Alert.alert("Error", "Gagal memuat catatan. Coba lagi nanti.");
			}
		);

		return () => {
			clearTimeout(timeout);
			unsub();
		};
	}, [pendingOp, pendingTimer]);

	useEffect(() => {
		const params: any = (route as any).params;
		if (params && params.pendingOp) {
			setPendingOp(params.pendingOp);
			setSnackbar({ visible: true, message: "Saving..." });
			(navigation as any).setParams({ pendingOp: undefined });

			const t = setTimeout(() => {
				setSnackbar({
					visible: true,
					message: "Failed to save",
					actionLabel: "Retry",
					action: async () => {
						try {
							if (params.pendingOp.type === "create") {
								await addDoc(
									collection(db, "users", auth.currentUser!.uid, "notes"),
									{
										title: params.pendingOp.title,
										content: params.pendingOp.content,
										color: params.pendingOp.color,
										clientCreatedAt: params.pendingOp.clientCreatedAt,
										createdAt: serverTimestamp(),
										updatedAt: serverTimestamp(),
									}
								);
							} else if (params.pendingOp.type === "update") {
								await updateDoc(
									doc(
										db,
										"users",
										auth.currentUser!.uid,
										"notes",
										params.pendingOp.noteId
									),
									{
										title: params.pendingOp.title,
										content: params.pendingOp.content,
										clientUpdatedAt: params.pendingOp.clientUpdatedAt,
										updatedAt: serverTimestamp(),
									}
								);
							}
							setSnackbar({ visible: true, message: "Saved" });
							setPendingOp(null);
						} catch (e) {
							console.error(e);
							setSnackbar({ visible: true, message: "Retry failed" });
						}
					},
				});
			}, 7000);
			setPendingTimer(t);
		}
	}, [navigation, route]);

	const deleteNote = (id: string) => {
		Alert.alert("Hapus Catatan", "Yakin ingin menghapus?", [
			{ text: "Batal", style: "cancel" },
			{
				text: "Hapus",
				style: "destructive",
				onPress: async () => {
					try {
						await deleteDoc(
							doc(db, "users", auth.currentUser!.uid, "notes", id)
						);
						// onSnapshot akan otomatis update list → tidak perlu setState manual
						setSnackbar({ visible: true, message: "Note deleted" });
					} catch {
						setSnackbar({
							visible: true,
							message: "Gagal menghapus",
							actionLabel: "Retry",
							action: async () => {
								try {
									await deleteDoc(
										doc(db, "users", auth.currentUser!.uid, "notes", id)
									);
									setSnackbar({ visible: true, message: "Note deleted" });
								} catch (e) {
									console.error(e);
									setSnackbar({ visible: true, message: "Retry failed" });
								}
							},
						});
					}
				},
			},
		]);
	};

	if (loading) {
		return (
			<>
				<View style={styles.center}>
					<ActivityIndicator size="large" />
				</View>
				<Snackbar
					visible={snackbar.visible}
					onDismiss={() => setSnackbar((s) => ({ ...s, visible: false }))}
					action={
						snackbar.actionLabel
							? { label: snackbar.actionLabel, onPress: snackbar.action! }
							: undefined
					}
					duration={snackbar.actionLabel ? 8000 : 3000}
				>
					{snackbar.message}
				</Snackbar>
			</>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>Notes</Text>

				{/* TOMBOL LOGOUT */}
				<TouchableOpacity
					style={styles.logoutButton}
					onPress={() => {
						Alert.alert(
							"Keluar",
							"Yakin ingin keluar dari akun?",
							[
								{ text: "Batal", style: "cancel" },
								{
									text: "Keluar",
									style: "destructive",
									onPress: async () => {
										try {
											await signOut(auth);
											// Otomatis akan pindah ke LoginScreen karena Auth state berubah
										} catch {
											Alert.alert("Error", "Gagal logout");
										}
									},
								},
							],
							{ cancelable: true }
						);
					}}
				>
					<LogOut color="#000" size={26} />
				</TouchableOpacity>
			</View>

			<FlatList
				data={notes}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				ListEmptyComponent={
					<View style={styles.empty}>
						<Image
							source={require("@/assets/images/notes-empty.png")}
							style={styles.emptyImg}
						/>
						<Text style={styles.emptyText}>Create your first note !</Text>
					</View>
				}
				renderItem={({ item }) => (
					<View
						style={[
							styles.cardWrapper,
							{ backgroundColor: item.color || COLORS[0] },
						]}
					>
						<TouchableOpacity
							style={styles.card}
							onPress={() =>
								navigation.navigate("NoteDetail", { noteId: item.id })
							}
						>
							<Text style={styles.cardTitle} numberOfLines={2}>
								{item.title || "Tanpa Judul"}
							</Text>
							<Text style={styles.cardPreview} numberOfLines={3}>
								{item.content || ""}
							</Text>
						</TouchableOpacity>

						<View style={styles.cardActions}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("CreateNote", {
										noteId: item.id,
									} as never)
								}
								style={styles.iconBtn}
							>
								<Pencil color="#000" size={20} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => deleteNote(item.id)}
								style={styles.iconBtn}
							>
								<Trash2 color="#000" size={20} />
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>

			<TouchableOpacity
				style={styles.fab}
				onPress={() => navigation.navigate("CreateNote")}
			>
				<Plus color="white" size={32} />
			</TouchableOpacity>
		</View>
	);
}

// ============================================== STYLES
const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 16,
		paddingBottom: 8,
	},
	headerTitle: {
		fontSize: 36,
		fontWeight: "bold",
	},
	logoutButton: {
		padding: 8,
		backgroundColor: "#f1f1f1",
		borderRadius: 12,
		// Optional: tambah shadow biar lebih premium
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	container: { flex: 1, backgroundColor: "#fff" },
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},

	list: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 100 },
	empty: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	emptyImg: { width: 300, height: 300 },
	emptyText: { marginTop: 32, fontSize: 18, color: "#666" },

	cardWrapper: {
		marginBottom: 20,
		borderRadius: 20,
		overflow: "hidden",
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	card: { padding: 20 },
	cardTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
	cardPreview: { marginTop: 8, fontSize: 14, color: "#333", lineHeight: 20 },
	cardActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		padding: 12,
		backgroundColor: "rgba(0,0,0,0.07)",
	},
	iconBtn: { marginLeft: 16 },

	fab: {
		position: "absolute",
		right: 24,
		bottom: 32,
		backgroundColor: "#000",
		width: 64,
		height: 64,
		borderRadius: 32,
		justifyContent: "center",
		alignItems: "center",
		elevation: 8,
	},
});
