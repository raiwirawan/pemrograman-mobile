# KETERANGAN REPOSITORY

Repository ini berisi tugas-tugas yang telah saya kerjakan selama mengikuti mata kuliah Pemrograman Mobile. Setiap tugas disimpan dalam branch terpisah dengan nama yang sesuai dengan tugas tersebut.

## Keterangan Tugas

### [5. **tugas-5**: Implementasi Firestore Database.](https://github.com/raiwirawan/pemrograman-mobile/tree/tugas-5)

- Mengintegrasikan Firebase Firestore sebagai database backend.
- Membuat koleksi dan dokumen di Firestore.
- Membaca, menulis, memperbarui, dan menghapus data dari Firestore (CRUD).
- File utama: `app/index.tsx`
- Contoh struktur database dalam JSON:

```
{
  "users": {
    "uX7kP9mN2vR5tY8uI0pQ": {
      "notes": {
        "note_001abc": {
          "title": "Book Review : The Design of Everyday Things by Don Norman",
          "content": "The Design of Everyday Things is required reading for anyone...",
          "color": "#FB923C",
          "createdAt": "2025-11-28T10:15:30Z",
          "updatedAt": "2025-11-28T10:15:30Z",
          "clientCreatedAt": 1737963330123
        },
        "note_002def": {
          "title": "Animes produced by Ufotable",
          "content": "List rekomendasi anime dari studio Ufotable...",
          "color": "#34D399",
          "createdAt": "2025-11-27T08:22:11Z",
          "updatedAt": "2025-11-28T14:30:45Z",
          "clientCreatedAt": 1737884532111,
          "clientUpdatedAt": 1737984645123
        }
      }
    }
  }
}

```

- Rules Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

- Penjelasan rules Firestore:
  - `/users/{userId}/notes/{noteId}`: Hanya pengguna yang memiliki UID yang sama dengan `userId` yang dapat membaca dan menulis catatan di koleksi `notes` mereka.
  - `/users/{userId}`: Hanya pengguna yang memiliki UID yang sama dengan `userId` yang dapat membaca dan menulis data pengguna mereka.

#### Silahkan kunjungi branch [tugas-5](https://github.com/raiwirawan/pemrograman-mobile/tree/tugas-5)

---
