class TabItem {
	constructor(link, content) {
		 this.link = link;
		 this.content = content;
	}

	onClick(callback) {
		 this.link.addEventListener('click', callback);
	}

	activate() {
		 this.#_toggle(true);
	}

	deactivate() {
		 this.#_toggle(false);
	}

	#_toggle(activate) {
		 this.link.classList.toggle('active', activate);
		 this.content.classList.toggle('active', activate);
	}
}

export class TabsManager {
	constructor(tabsElem) {
		 this.tabs = [];
		 this.activeTab = null;

		 this.init(tabsElem);
		 this.activateTab(this.tabs[0]);
	}

	init(tabsElem) {
		 const links = tabsElem.querySelectorAll('.prices__link li');
		 const contents = tabsElem.querySelectorAll('.prices__item');

		 for (let i = 0; i <= links.length - 1; i++) {
			  const tab = new TabItem(links[i], contents[i]);
			  tab.onClick(() => this.activateTab(tab));
			  this.tabs.push(tab);
		 }
	}

	activateTab(tab) {
		 if (this.activeTab) {
			  this.activeTab.deactivate();
		 }

		 this.activeTab = tab;
		 this.activeTab.activate();
	}

	activateTabByIndex(index) {
		 const tab = this.tabs[index] !== undefined;

		 if (tab) {
			  this.activateTab(this.tabs[index]);
		 }
	}
}
