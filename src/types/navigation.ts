// src/types/navigation.ts
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	Home: undefined;
	CreateNote: undefined;
	NoteDetail: { noteId: string };
	// tambah screen lain di sini nanti
};

export type HomeScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"Home"
>;
export type NoteDetailScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"NoteDetail"
>;
