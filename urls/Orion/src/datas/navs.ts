export type NavCategory =
	| "device"
	| "language"
	| "screen"
	| "browser"
	| "timezone"
	| "connection"
	| "url";

export interface NavItem {
	title: string;
	label: string;
	returns: string;
	category: NavCategory;
}

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

export const NAVS_DATAS: NavItem[] = [
	// 裝置與作業系統
	{
		title: "完整 User Agent",
		label: "navigator.userAgent",
		returns: safeGet(() => navigator.userAgent),
		category: "device",
	},
	{
		title: "平台資訊",
		label: "navigator.platform",
		returns: safeGet(() => navigator.platform),
		category: "device",
	},
	{
		title: "CPU 邏輯核心數",
		label: "navigator.hardwareConcurrency",
		returns: safeGet(() => String(navigator.hardwareConcurrency)),
		category: "device",
	},
	{
		title: "裝置記憶體（GB，約略值）",
		label: "navigator.deviceMemory",
		returns: safeGet(() => String((navigator as any).deviceMemory)),
		category: "device",
	},
	{
		title: "最大觸控點數",
		label: "navigator.maxTouchPoints",
		returns: safeGet(() => String(navigator.maxTouchPoints)),
		category: "device",
	},

	// 語言與地區
	{
		title: "主要語言",
		label: "navigator.language",
		returns: safeGet(() => navigator.language),
		category: "language",
	},
	{
		title: "語言偏好清單",
		label: "navigator.languages",
		returns: safeGet(() => navigator.languages.join(", ")),
		category: "language",
	},

	// 螢幕與顯示
	{
		title: "螢幕解析度",
		label: "screen.width x screen.height",
		returns: safeGet(() => `${screen.width} x ${screen.height}`),
		category: "screen",
	},
	{
		title: "可用解析度（扣除工作列等）",
		label: "screen.availWidth x screen.availHeight",
		returns: safeGet(() => `${screen.availWidth} x ${screen.availHeight}`),
		category: "screen",
	},
	{
		title: "裝置畫素比",
		label: "window.devicePixelRatio",
		returns: safeGet(() => String(window.devicePixelRatio)),
		category: "screen",
	},
	{
		title: "色彩深度",
		label: "screen.colorDepth",
		returns: safeGet(() => String(screen.colorDepth)),
		category: "screen",
	},

	// 瀏覽器功能與狀態
	{
		title: "是否允許 Cookie",
		label: "navigator.cookieEnabled",
		returns: safeGet(() => String(navigator.cookieEnabled)),
		category: "browser",
	},
	{
		title: "目前是否偵測到連線",
		label: "navigator.onLine",
		returns: safeGet(() => String(navigator.onLine)),
		category: "browser",
	},
	{
		title: "請勿追蹤設定",
		label: "navigator.doNotTrack",
		returns: safeGet(() => navigator.doNotTrack ?? NOT_SUPPORTED),
		category: "browser",
	},
	{
		title: "來源頁面",
		label: "document.referrer",
		returns: safeGet(() => document.referrer || "（直接造訪，無來源頁面）"),
		category: "browser",
	},

	// 時區
	{
		title: "瀏覽器判斷時區",
		label: "Intl.DateTimeFormat().resolvedOptions().timeZone",
		returns: safeGet(() => Intl.DateTimeFormat().resolvedOptions().timeZone),
		category: "timezone",
	},
	{
		title: "與 UTC 時差（分鐘）",
		label: "Date.getTimezoneOffset()",
		returns: safeGet(() => String(new Date().getTimezoneOffset())),
		category: "timezone",
	},

	// 連線資訊（實驗性 API，相容性不一）
	{
		title: "估計網路類型",
		label: "navigator.connection.effectiveType",
		returns: safeGet(() => (navigator as any).connection.effectiveType),
		category: "connection",
	},
	{
		title: "估計頻寬（Mbps）",
		label: "navigator.connection.downlink",
		returns: safeGet(() => String((navigator as any).connection.downlink)),
		category: "connection",
	},

	// URL 與來源
	{
		title: "目前頁面網址",
		label: "window.location.href",
		returns: safeGet(() => window.location.href),
		category: "url",
	},
	{
		title: "通訊協定",
		label: "window.location.protocol",
		returns: safeGet(() => window.location.protocol),
		category: "url",
	},
];