"use server";

import OpenAI from "openai";

export async function ask(number: string) {
	try {
		const openai = new OpenAI();

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "user",
					content: `tell me some fun and interesting facts about the number "${number}". do not use markdown. return a numbered list. do not include boilerplate or summary or intro.`,
				},
			],
		});

		if (completion && completion.choices.length > 0)
			return (
				completion.choices[0].message.content ??
				"Error asking facts machine, please try again later"
			);
		else return "Error asking facts machine, please try again later";
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return "Error asking facts machine, please try again later";
	}
}
