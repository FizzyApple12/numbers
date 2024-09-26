"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Binary } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const mapArray = new Array(50).fill(0);

const filterNumber = (number: string): string => {
	if (number == "-" || number == "") {
		return number;
	}

	let prefix = "";

	if (number[0] == "-") {
		prefix = number[0];
		number = number.substring(1);
	}

	return `${prefix}${number
		.split(".")
		.filter((_, i) => i < 2)
		.map((v) => v.replace(/[^0-9]/g, ""))
		.join(".")}`;
};

const generateNumberExtension = (number: string, i: number): string => {
	if (i == 0) {
		if (number[number.length - 1] == ".")
			return number.substring(0, number.length - 1);
		else return number;
	}

	if (i < 10) return `${number}0${i}`;
	else return `${number}${i}`;
};

const Page: FC = () => {
	const router = useRouter();

	const [baseNumber, setBaseNumber] = useState<string>("");

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 md:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-0 row-start-2 items-center w-full md:w-1/2">
				<div className="relative w-full">
					<Binary className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-all" />
					<Input
						placeholder="Type to find a rational number..."
						className="pl-10"
						value={baseNumber}
						onChange={(e) => {
							const newValue = e.target.value;

							setBaseNumber(filterNumber(newValue));
						}}
						onKeyDown={(e) => {
							if (e.key == "Enter") {
								router.push(
									`/${generateNumberExtension(baseNumber, 0)}`
								);
							}
						}}
					/>
				</div>
				<Card
					className="w-full border-t-0 rounded-tl-none rounded-tr-none transition-all duration-500 ease-in-out break-words overflow-hidden"
					style={{
						maxHeight: baseNumber == "" ? "0" : "50vh",
						opacity: baseNumber == "" ? "0" : "1",
					}}
				>
					<CardContent className="transition-all flex flex-col gap-2 h-[50vh] p-4 overflow-hidden">
						<p className="text-muted-foreground text-wrap">
							Showing the top 50 results for {'"'}
							{baseNumber}
							{'"'}
						</p>
						<div
							className="flex flex-col gap-2 overflow-scroll py-2"
							tabIndex={-1}
						>
							{mapArray.map((_, i) => (
								<div
									key={i}
									className="flex-grow flex flex-row items-center justify-between mx-2 break-words max-w-full"
								>
									<Button
										variant={"ghost"}
										className="flex-grow flex flex-row items-center justify-between max-w-full h-auto"
										onClick={() =>
											router.push(
												`/${generateNumberExtension(
													baseNumber,
													i
												)}`
											)
										}
									>
										<span className="text-left max-w-[calc(100%-1rem-24px)] text-wrap break-words">
											{generateNumberExtension(
												baseNumber,
												i
											)}
										</span>
										<ArrowRight className="min-w-[24px]" />
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</main>
			<div className="absolute bottom-4 right-4">
				<ThemeSwitch />
			</div>
		</div>
	);
};

export default Page;
