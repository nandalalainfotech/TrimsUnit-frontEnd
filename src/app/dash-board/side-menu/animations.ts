import {
	animate,
	animation,
	query,
	sequence,
	stagger,
	style
} from "@angular/animations";

export const SidebarOpenAnimation = animation([
	style({ left: "-{{menuWidth}}" }),

	sequence([
		animate("1500ms linear", style({ left: "0" })),
	])
]);

export const SidebarCloseAnimation = animation([
	style({ left: "0" }),

	sequence([
		animate("1500ms linear", style({ left: "-{{menuWidth}}" }))
	])
]);