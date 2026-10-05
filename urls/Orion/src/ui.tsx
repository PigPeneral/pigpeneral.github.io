import { useState } from "react";
import type { NavItem, NavCategory } from "./datas/navs";
import { INFO_TEXTS } from "./datas/infotexts";
import styles from "./UI.module.css";

// ---- Tooltip ----

interface TooltipProps {
	text: string;
	children: React.ReactNode;
}

export const Tooltip = ({ text, children }: TooltipProps) => {
	const [show, setShow] = useState(false);

	return (
		<span
			className={styles.tooltipWrapper}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			{children}
			{show && <span className={styles.tooltipBox}>{text}</span>}
		</span>
	);
};

// ---- Table ----

interface TableProps {
	title?: string;
	subtitle?: string;
	items: NavItem[];
}

export const Table = ({ title, subtitle, items }: TableProps) => {
	return (
		<div className={styles.glass}>
			{(title || subtitle) && (
				<div className={styles.tableHeader}>
					{title && <h5 className={styles.tableTitle}>{title}</h5>}
					{subtitle && <p className={styles.tableSubtitle}>{subtitle}</p>}
				</div>
			)}
			<div className={styles.grid}>
				{items.map((item) => {
					const info = INFO_TEXTS[item.label];
					return (
						<div className={styles.cell} key={item.label}>
							<div className={styles.cellLabel}>
								{info ? (
									<Tooltip text={info.summary}>
										<span className={styles.hoverable}>{item.title}</span>
									</Tooltip>
								) : (
									item.title
								)}
							</div>
							<div className={styles.cellValue}>{item.returns}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

// ---- Filter ----

interface FilterBarProps {
	categories: { value: NavCategory; label: string }[];
	active: NavCategory[];
	onToggle: (category: NavCategory) => void;
}

export const FilterBar = ({ categories, active, onToggle }: FilterBarProps) => {
	return (
		<div className={styles.filterBar}>
			{categories.map((c) => (
				<button
					key={c.value}
					className={
						active.includes(c.value)
							? `${styles.filterChip} ${styles.filterChipActive}`
							: styles.filterChip
					}
					onClick={() => onToggle(c.value)}
				>
					{c.label}
				</button>
			))}
		</div>
	);
};