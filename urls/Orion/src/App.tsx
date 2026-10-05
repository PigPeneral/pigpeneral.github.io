import { useState } from "react";
import { NAVS_DATAS } from "./datas/navs";
import { FINGERPRINT_DATAS } from "./datas/fingerprint";
import type { NavCategory } from "./datas/navs";
import { Table, FilterBar } from "./ui";
import "./App.css";

const ALL_CATEGORIES: { value: NavCategory; label: string }[] = [
	{ value: "device", label: "裝置" },
	{ value: "language", label: "語言" },
	{ value: "screen", label: "螢幕" },
	{ value: "browser", label: "瀏覽器狀態" },
	{ value: "timezone", label: "時區" },
	{ value: "connection", label: "連線" },
	{ value: "url", label: "網址" },
];

function App() {
	const [activeCategories, setActiveCategories] = useState<NavCategory[]>(
		ALL_CATEGORIES.map((c) => c.value)
	);

	const toggleCategory = (category: NavCategory) => {
		setActiveCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const filteredNavs = NAVS_DATAS.filter((item) =>
		activeCategories.includes(item.category)
	);
	const filteredFingerprint = FINGERPRINT_DATAS.filter((item) =>
		activeCategories.includes(item.category)
	);

	return (
		<main className="appRoot">
			<header className="appHeader">
				<h1>Orion</h1>
				<p>你的瀏覽器，正在告訴這個網頁這些事。</p>
			</header>

			<FilterBar
				categories={ALL_CATEGORIES}
				active={activeCategories}
				onToggle={toggleCategory}
			/>

			<Table
				title="瀏覽器基本資訊"
				subtitle="由 Navigator 與相關 API 提供"
				items={filteredNavs}
			/>

			<Table
				title="進階與指紋辨識資訊"
				subtitle="一般使用者較少意識到瀏覽器能提供這些內容"
				items={filteredFingerprint}
			/>
		</main>
	);
}

export default App;