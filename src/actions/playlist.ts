"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPlaylist(userId: string, formData: FormData) {
  const name = formData.get("name") as string;
  
  if (!name) throw new Error("O nome da playlist é obrigatório.");

  await prisma.playlist.create({
    data: {
      name,
      userId,
      coverImage: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=300&q=80", 
    },
  });

  revalidatePath("/"); 
}

export async function addSongToPlaylist(playlistId: string, songId: string) {
  await prisma.playlistSong.create({
    data: {
      playlistId,
      songId,
    },
  });
  revalidatePath(`/playlist/${playlistId}`);
}
export async function deletePlaylist(playlistId: string) {
  await prisma.playlist.delete({
    where: { id: playlistId },
  });
  revalidatePath("/");
}
