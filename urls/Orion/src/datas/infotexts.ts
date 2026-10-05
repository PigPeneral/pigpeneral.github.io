// 說明文字集中放這裡，之後 hover 或 info block 元件可以用 label 當 key 去查對應說明
// 這裡的內容都是草稿，之後要自己順過一次行文風格

export interface InfoText {
	summary: string; // 一兩句話講這是什麼
	detail?: string; // 想展開的話可以放更深入的解釋
}

export const INFO_TEXTS: Record<string, InfoText> = {
	// ---- navs.ts ----
	"navigator.userAgent": {
		summary: "瀏覽器主動告訴網站的一段自我介紹文字，包含瀏覽器種類、版本、作業系統等資訊。",
		detail: "這段文字的格式其實挺混亂的，因為歷史因素，各家瀏覽器常常在裡面塞進其他瀏覽器的名字來偽裝相容性，所以單看 User Agent 猜瀏覽器種類，有時候並不準確。",
	},
	"navigator.platform": {
		summary: "回報作業系統平台，目前已被標示為不建議使用的舊 API，但仍可讀取。",
	},
	"navigator.hardwareConcurrency": {
		summary: "你的裝置有幾個邏輯處理器核心，網站可以用這個資訊決定要不要啟動多工運算。",
	},
	"navigator.deviceMemory": {
		summary: "裝置大概有多少記憶體，數值是概略值而不是精確容量。",
		detail: "基於隱私考量，這個 API 回傳的數字是刻意模糊化過的（例如只會是 0.5、1、2、4、8 這種級距），不會洩漏精確的記憶體容量。",
	},
	"navigator.maxTouchPoints": {
		summary: "這個裝置最多能同時偵測到幾根手指觸控，可以用來初步判斷是不是觸控螢幕。",
	},
	"navigator.language": {
		summary: "瀏覽器目前設定的主要語言。",
	},
	"navigator.languages": {
		summary: "瀏覽器語言偏好的完整清單，依優先順序排列。",
	},
	"screen.width x screen.height": {
		summary: "你的螢幕完整解析度。",
	},
	"screen.availWidth x screen.availHeight": {
		summary: "扣掉工作列、Dock 等系統介面佔用空間後，實際可用的螢幕範圍。",
	},
	"window.devicePixelRatio": {
		summary: "裝置畫素比，數字越大代表螢幕解析度相對於實際顯示尺寸越高密集（像是 Retina 螢幕）。",
	},
	"screen.colorDepth": {
		summary: "螢幕能顯示的色彩深度，單位是位元，現代螢幕大多是 24 或 30。",
	},
	"navigator.cookieEnabled": {
		summary: "瀏覽器目前是否允許網站存放 Cookie。",
	},
	"navigator.onLine": {
		summary: "瀏覽器偵測到的網路連線狀態，注意這只代表『有沒有連上某個網路』，不代表真的能連上網際網路。",
	},
	"navigator.doNotTrack": {
		summary: "使用者是否在瀏覽器設定裡開啟了『請勿追蹤』。",
		detail: "這個設定本質上只是一個請求訊號，網站完全可以選擇忽略它，沒有強制力，這也是這個功能逐漸被瀏覽器廠商淡化的原因之一。",
	},
	"document.referrer": {
		summary: "你從哪一個頁面連結過來的，如果是直接輸入網址或透過書籤造訪，這裡會是空的。",
		detail: "這就是為什麼你從搜尋引擎點進某個網站，那個網站有時候知道你是從哪裡來的，雖然現代瀏覽器基於隱私考量，已經會在很多情況下隱藏完整的來源網址。",
	},
	"Intl.DateTimeFormat().resolvedOptions().timeZone": {
		summary: "瀏覽器根據你裝置的系統設定，判斷出的目前所在時區。",
	},
	"Date.getTimezoneOffset()": {
		summary: "你目前所在時區跟世界協調時間（UTC）相差幾分鐘。",
	},
	"navigator.connection.effectiveType": {
		summary: "瀏覽器估計目前的網路連線類型，例如 4g、3g。",
		detail: "這是一個實驗性功能，目前只有 Chromium 系列瀏覽器（如 Chrome、Edge）支援，Safari 和 Firefox 基於隱私考量並未實作。",
	},
	"navigator.connection.downlink": {
		summary: "瀏覽器估計的下載頻寬，單位是 Mbps，這是一個約略估計值。",
	},
	"window.location.href": {
		summary: "目前頁面的完整網址。",
	},
	"window.location.protocol": {
		summary: "目前網站使用的通訊協定，http 代表未加密傳輸，https 代表有加密保護。",
	},

	// ---- fingerprint.ts ----
	"history.length": {
		summary: "這個分頁從開啟到現在，瀏覽過幾個頁面。",
		detail: "網站拿不到你實際造訪過哪些網址，但光是知道『這個數字』，就能推測你是剛打開分頁直接進來，還是已經在網站間跳轉了一陣子才抵達。",
	},
	"document.hasFocus()": {
		summary: "這個分頁現在是不是你正在看的那一個，還是被切到背景去了。",
	},
	"document.visibilityState": {
		summary: "更細緻的分頁可視狀態，標示目前是『顯示中』還是『被隱藏』。",
	},
	'matchMedia("(pointer: fine)")': {
		summary: "判斷你主要用的輸入裝置是精確的（像滑鼠）還是粗略的（像手指觸控）。",
		detail: "這比單純看裝置的 User Agent 字串猜測『是不是手機』更準確，因為有些筆電同時有觸控螢幕又有滑鼠。",
	},
	"screen.orientation.type": {
		summary: "螢幕目前的方向，直向或橫向。",
	},
	"performance.now()": {
		summary: "一個從頁面載入那一刻開始計算的高精度計時器，單位是毫秒。",
		detail: "這種高精度的時間資訊，結合其他細微差異，也是瀏覽器指紋辨識技術會用到的素材之一。",
	},
	"performance.memory.usedJSHeapSize": {
		summary: "這個網頁目前佔用了多少瀏覽器記憶體。",
		detail: "這是 Chromium 系列瀏覽器獨有的功能，Safari 和 Firefox 並未開放這項資訊給網頁讀取。",
	},
	"canvas.toDataURL() → hash": {
		summary: "網站在看不見的畫布上畫一段文字，再讀取畫出來的像素資料算出一串獨特代碼，這串代碼在不同裝置上往往不一樣。",
		detail: "因為每台裝置的顯示卡、字型、作業系統在繪製同一段文字時會有極細微的像素差異，這些差異足以把你的裝置『認出來』——即使你清除了 Cookie 或開啟無痕模式，這個指紋通常也不會改變，這正是這項技術常被用在使用者追蹤上，也引發不少隱私爭議的原因。",
	},
};