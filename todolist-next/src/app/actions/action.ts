"use server"

import { revalidatePath } from "next/cache"
import prisma from "../../../lib/prisma";

export async function createTask(data: FormData) {
	try {
		await prisma.task.create({
			data: {
				title: data.get("title") as string,
				userId: 1
			},
		});
	} catch (error) {
		console.error("Failed to create todo:", error);
		// Optionally, return an error message to the client
		return { message: "Failed to create todo." };
	}

	// Revalidate the path to trigger a re-render
	revalidatePath("/");
}
