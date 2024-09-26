"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { FC, useState } from "react";
import { AutoTextSize } from "auto-text-size";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { ask } from "./factsMachine";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { redirect, useRouter } from "next/navigation";

const isValidNumber = (number: string): boolean => {
	if (number == "-" || number == "") {
		return true;
	}

	if (number[0] == "-") {
		number = number.substring(1);
	}

	const decimals = number.split(".");

	for (let i = 0; i < decimals.length; i++) {
		if (i >= 2) return false;

		const regexResponse = decimals[i].match(/[^0-9]/g);

		if (regexResponse && regexResponse.length != 0) return false;
	}

	return true;
};

const Page: FC<{
	params: { number: string };
}> = ({ params }) => {
	if (!isValidNumber(params.number)) redirect("/");

	const router = useRouter();

	const [loadingFacts, setLoadingFacts] = useState<boolean>(false);
	const [facts, setFacts] = useState<string>("");
	const [factsOpen, setFactsOpen] = useState<boolean>(false);

	const askAboutNumber = async () => {
		setLoadingFacts(true);

		if (facts == "") setFacts(await ask(params.number));

		setLoadingFacts(false);
		setFactsOpen(true);
	};

	return (
		<>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 md:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col row-start-2 !items-center justify-center w-3/4 md:w-1/2 gap-4">
					<AutoTextSize minFontSizePx={24} mode={"multiline"}>
						{params.number}
					</AutoTextSize>

					<div className="flex flex-row gap-4">
						<Button onClick={() => router.push("/")}>
							<ArrowLeft className="mr-2" />
							Back
						</Button>
						<Button
							onClick={() => askAboutNumber()}
							disabled={loadingFacts}
						>
							Learn Something About This Number
							{loadingFacts ? (
								<LoaderCircle className="ml-2 animate-spin" />
							) : (
								<ArrowRight className="ml-2" />
							)}
						</Button>
					</div>
				</main>
				<div className="absolute bottom-4 right-4">
					<ThemeSwitch />
				</div>
			</div>
			<Dialog open={factsOpen} onOpenChange={(v) => setFactsOpen(v)}>
				<DialogContent className="!w-[90vw] md:!w-[50vw] max-w-none">
					<DialogHeader className="!w-[calc(90vw-48px)] md:!w-[calc(50vw-48px)]">
						<DialogTitle className="text-wrap break-words">
							AI slop about the number {params.number}
						</DialogTitle>
						<DialogDescription className="text-wrap max-h-[75vh] overflow-y-scroll">
							{facts.split("\n").map((v, i) => (
								<>
									<span
										key={`span${i}`}
										className="text-wrap"
									>
										{v}
									</span>
									<br key={`br${i}`} />
								</>
							))}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Page;

//gpt-4o-mini
