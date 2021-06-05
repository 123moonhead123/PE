window.gameCode={
	version: "1.2101"
};

Config.history.maxStates=5; //TODO Set this back to 5 after testing

window.sidebarTabs=[
	{
		name: "👚",
		tableId: "clothes"
	},
	{
		name: "👜",
		tableId: "inventory"
	},
	{
		name: "📈",
		tableId: "stats"
	},
	{
		name: "🤡",
		tableId: "mmavatar"
	},
	{
		name: "📜",
		tableId: "debug"
	}
];

window.sidebar={
	className: function(id) {
		return (State.active.variables.sidebarTab == id) ? "" : "hidden";
	},
	tabClassName: function(id) {
		return (State.active.variables.sidebarTab == id) ? "sidebar_tab_active" : "sidebar_tab_inactive";
	},
	refresh: function() {
		for (var i=0; i < window.sidebarTabs.length; i++) {
			var o=document.getElementById(window.sidebarTabs[i].tableId);
			if (o) {
				o.className = window.sidebar.className(i);
				document.getElementById('sidebar_control').children[0].children[i+1].className=sidebar.tabClassName(i);
			}
		}
	},
	activate: function(id) {
		State.active.variables.sidebarTab=id;
		this.refresh();
	}
}