// utils/copyToClipboard.ts
export function copyToClipboard(text: string): void {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text).then(
			() => {
				console.log("Copied to clipboard successfully!");
			},
			(err) => {
				console.error("Failed to copy to clipboard:", err);
			}
		);
	} else {
		// Fallback method for older browsers
		const textArea = document.createElement("textarea");
		textArea.value = text;

		// Avoid scrolling to bottom
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			if (successful) {
				console.log("Copied to clipboard successfully!");
			} else {
				console.error("Failed to copy to clipboard.");
			}
		} catch (err) {
			console.error("Failed to copy to clipboard:", err);
		}

		document.body.removeChild(textArea);
	}
}
