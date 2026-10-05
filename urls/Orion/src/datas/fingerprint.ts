import type { NavItem } from "./navs";

const NOT_SUPPORTED = "此瀏覽器不支援";

function safeGet(fn: () => string): string {
	try {
		const value = fn();
		return value === undefined || value === null || value === ""
			? NOT_SUPPORTED
			: value;
	} catch {
		return NOT_SUPPORTED;
	}
}

function getCanvasFingerprint(): string {
	try {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return NOT_SUPPORTED;

		canvas.width = 200;
		canvas.height = 50;
		ctx.textBaseline = "top";
		ctx.font = "14px Arial";
		ctx.fillStyle = "#f60";
		ctx.fillRect(0, 0, 200, 50);
		ctx.fillStyle = "#069";
		ctx.fillText("Browser Fingerprint 指紋測試", 2, 15);

		const dataUrl = canvas.toDataURL();
		let hash = 0;
		for (let i = 0; i < dataUrl.length; i++) {
			hash = (hash << 5) - hash + dataUrl.charCodeAt(i);
			hash |= 0;
		}
		return hash.toString(16);
	} catch {
		return NOT_SUPPORTED;
	}
}

export const FINGERPRINT_DATAS: NavItem[] = [
	{
		title: "這個分頁瀏覽過幾個頁面",
		label: "history.length",
		returns: safeGet(() => String(history.length)),
		category: "browser",
	},
	{
		title: "這個分頁目前是否正在被使用者查看",
		label: "document.hasFocus()",
		returns: safeGet(() => String(document.hasFocus())),
		category: "browser",
	},
	{
		title: "分頁可視狀態",
		label: "document.visibilityState",
		returns: safeGet(() => document.visibilityState),
		category: "browser",
	},
	{
		title: "主要輸入裝置精確度",
		label: 'matchMedia("(pointer: fine)")',
		returns: safeGet(() =>
			String(window.matchMedia("(pointer: fine)").matches)
		),
		category: "device",
	},
	{
		title: "螢幕方向",
		label: "screen.orientation.type",
		returns: safeGet(() => screen.orientation.type),
		category: "screen",
	},
	{
		title: "高精度時間戳記（頁面載入至今的毫秒數）",
		label: "performance.now()",
		returns: safeGet(() => performance.now().toFixed(2)),
		category: "device",
	},
	{
		title: "目前網頁佔用的 JS 記憶體（MB，約略值）",
		label: "performance.memory.usedJSHeapSize",
		returns: safeGet(() => {
			const mem = (performance as any).memory;
			return (mem.usedJSHeapSize / 1048576).toFixed(2) + " MB";
		}),
		category: "device",
	},
	{
		title: "Canvas 指紋（簡化 hash）",
		label: "canvas.toDataURL() → hash",
		returns: safeGet(() => getCanvasFingerprint()),
		category: "device",
	},
];